#!/usr/bin/env node
/**
 * @fileoverview OFFWORLD LEGACY — NASA Asset Download Script
 *
 * Downloads archival JPEG images from the NASA Image and Video Library API,
 * resizes to a consistent display width, and converts to optimized WebP for
 * use in the application image pipeline.
 *
 * Usage:
 *   node scripts/download-nasa-assets.js
 *
 * Requirements:
 *   - Node.js >= 18 (native fetch)
 *   - sharp devDependency (npm install --save-dev sharp)
 *
 * Sources:
 *   NASA Image and Video Library API: https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf
 *   All images are in the public domain per NASA media usage guidelines.
 */

import { createWriteStream, mkdirSync } from "node:fs";
import { rename, rm } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, "../public/images/missions");

// NASA Images API base URL
const NASA_API = "https://images-api.nasa.gov";

/**
 * Asset definitions for Phase 3C.
 * Each entry maps an archive record to a NASA image, preferred rendition tier,
 * target filename, and display width cap.
 *
 * Selects the smallest search-result rendition at or above TARGET_WIDTH when
 * NASA supplies dimensions, otherwise the largest known rendition. When the
 * API omits all dimensions, it uses the original asset to avoid upscaling.
 */
const ASSETS = [
  {
    record: "M-004",
    nasaId: "as15-88-11901",
    outputFile: "apollo-15-lrv.webp",
    targetWidth: 1200,
    credit: "NASA / David R. Scott, Apollo 15 EVA-3, August 2, 1971",
  },
  {
    record: "M-005",
    nasaId: "PIA00381",
    outputFile: "viking-1-lander.webp",
    targetWidth: 1200,
    credit: "NASA / JPL, Viking Lander 1, July 20, 1976",
  },
  {
    record: "M-006",
    nasaId: "PIA18079",
    outputFile: "opportunity-rover.webp",
    targetWidth: 1200,
    credit: "NASA / JPL-Caltech / Cornell Univ. / Arizona State Univ., March 2014",
  },
];

/** WebP encode quality (0–100). Matches existing pipeline quality. */
const WEBP_QUALITY = 82;

/**
 * Fetch the NASA Images API search record for a given NASA ID and return
 * the best available JPEG URL whose native width is >= targetWidth.
 * Falls back to the largest known rendition, or the original if the API
 * supplies no rendition dimensions.
 *
 * @param {string} nasaId
 * @param {number} targetWidth
 * @returns {Promise<{ url: string, width: number, height: number }>}
 */
async function resolveBestRendition(nasaId, targetWidth) {
  const searchUrl = `${NASA_API}/search?nasa_id=${encodeURIComponent(nasaId)}`;
  const res = await fetch(searchUrl, { signal: AbortSignal.timeout(30_000) });
  if (!res.ok) throw new Error(`NASA API search failed for ${nasaId}: HTTP ${res.status}`);
  const json = await res.json();

  const items = json?.collection?.items ?? [];
  const item = items.find((candidate) =>
    candidate?.data?.some(
      (entry) =>
        typeof entry?.nasa_id === "string" &&
        entry.nasa_id.toLowerCase() === nasaId.toLowerCase()
    )
  );
  if (!item) throw new Error(`No exact NASA ID match returned for nasa_id=${nasaId}`);

  const links = item.links ?? [];

  // Collect renditions that have explicit width metadata
  const renditions = links
    .filter(
      (link) =>
        link.render === "image" &&
        Number.isFinite(link.width) &&
        Number.isFinite(link.height) &&
        typeof link.href === "string"
    );

  if (renditions.length === 0) {
    // No metadata — fall back to the canonical orig link from the asset endpoint
    const assetUrl = `${NASA_API}/asset/${encodeURIComponent(nasaId)}`;
    const ar = await fetch(assetUrl, { signal: AbortSignal.timeout(30_000) });
    if (!ar.ok) throw new Error(`NASA API asset failed for ${nasaId}: HTTP ${ar.status}`);
    const aj = await ar.json();
    const orig = (aj?.collection?.items ?? []).find((i) => i?.href?.includes("~orig"));
    if (!orig) throw new Error(`No orig rendition found for ${nasaId}`);
    if (!orig.href.startsWith("https://")) throw new Error(`Invalid non-HTTPS image URL for ${nasaId}`);
    return { url: orig.href, width: null, height: null };
  }

  // Pick the smallest rendition >= targetWidth, or the largest available.
  const smallestFirst = [...renditions].sort((a, b) => a.width - b.width);
  const candidate =
    smallestFirst.find((r) => r.width >= targetWidth) ?? smallestFirst.at(-1);
  if (!candidate.href.startsWith("https://")) throw new Error(`Invalid non-HTTPS image URL for ${nasaId}`);

  return { url: candidate.href, width: candidate.width, height: candidate.height };
}

/**
 * Download a URL to a temporary file.
 * Returns the local file path.
 *
 * @param {string} url
 * @param {string} destPath
 */
async function downloadFile(url, destPath) {
  const res = await fetch(url, { signal: AbortSignal.timeout(120_000) });
  if (!res.ok) throw new Error(`Download failed ${url}: HTTP ${res.status}`);
  if (!res.body) throw new Error(`Download returned an empty response body for ${url}`);
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.startsWith("image/")) {
    throw new Error(`Download returned a non-image content type for ${url}: ${contentType || "missing"}`);
  }
  const dest = createWriteStream(destPath);
  await pipeline(Readable.fromWeb(res.body), dest);
}

/**
 * Convert a JPEG file to WebP at the target width using sharp.
 * Returns the actual output dimensions.
 *
 * @param {string} inputPath
 * @param {string} outputPath
 * @param {number} targetWidth
 * @returns {Promise<{ width: number, height: number }>}
 */
async function convertToWebP(inputPath, outputPath, targetWidth) {
  // Dynamic import so the script can still be read without sharp installed
  const sharp = (await import("sharp")).default;

  const info = await sharp(inputPath)
    .resize({ width: targetWidth, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY, effort: 4 })
    .toFile(outputPath);

  return { width: info.width, height: info.height };
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const results = [];

  for (const asset of ASSETS) {
    console.log(`\n[${asset.record}] Processing nasa_id=${asset.nasaId}`);

    const tmpJpeg = path.join(OUTPUT_DIR, `_tmp_${asset.nasaId}.jpg`);
    const tmpWebP = path.join(OUTPUT_DIR, `_tmp_${asset.nasaId}.webp`);
    const outputWebP = path.join(OUTPUT_DIR, asset.outputFile);

    try {
      // 1. Resolve best rendition URL
      console.log(`  → Querying NASA Images API...`);
      const { url, width: srcW, height: srcH } = await resolveBestRendition(
        asset.nasaId,
        asset.targetWidth
      );
      console.log(`  → Source: ${url} (${srcW ?? "?"}×${srcH ?? "?"} px)`);

      // 2. Download JPEG
      console.log(`  → Downloading...`);
      await downloadFile(url, tmpJpeg);

      // 3. Convert to WebP
      console.log(`  → Converting to WebP (quality=${WEBP_QUALITY}, width≤${asset.targetWidth})...`);
      const { width, height } = await convertToWebP(tmpJpeg, tmpWebP, asset.targetWidth);
      if (!width || !height) throw new Error("Image conversion returned invalid dimensions");
      await rename(tmpWebP, outputWebP);
      console.log(`  ✓ Saved: ${asset.outputFile} (${width}×${height} px)`);

      results.push({ ...asset, width, height, success: true });
    } catch (err) {
      console.error(`  ✗ FAILED: ${err.message}`);
      results.push({ ...asset, success: false, error: err.message });
    } finally {
      await Promise.all([
        rm(tmpJpeg, { force: true }),
        rm(tmpWebP, { force: true }),
      ]);
    }
  }

  console.log("\n────────────────────────────────────");
  console.log("Phase 3C Asset Download Summary");
  console.log("────────────────────────────────────");
  for (const r of results) {
    if (r.success) {
      console.log(`✓ ${r.record} → /images/missions/${r.outputFile} (${r.width}×${r.height})`);
    } else {
      console.log(`✗ ${r.record} → FAILED: ${r.error}`);
    }
  }

  const failed = results.filter((r) => !r.success);
  if (failed.length > 0) process.exitCode = 1;

  // Print the dimension data needed for missions.js
  console.log("\nDimensions for missions.js:");
  for (const r of results.filter((r) => r.success)) {
    console.log(`  ${r.record}: width=${r.width}, height=${r.height}, src="/images/missions/${r.outputFile}"`);
  }
}

main().catch((err) => {
  console.error("NASA asset processing failed:", err);
  process.exitCode = 1;
});
