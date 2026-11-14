import { useMemo, useState } from "react";
import { missions } from "../data/missions.js";
import { projectCoordinates } from "../data/coordinates.js";

const MAP = { width: 720, height: 360, paddingX: 48, paddingY: 30 };
const project = (latitude, longitude) => projectCoordinates(latitude, longitude, MAP.width, MAP.height, MAP.paddingX, MAP.paddingY);

export default function ExplorationMap({ destination, onDestinationChange, onOpenRecord }) {
  const [activeId, setActiveId] = useState(null);
  const sites = useMemo(
    () => missions.filter((mission) => mission.destination === destination && mission.location.coordinates),
    [destination],
  );
  const unknownSites = missions.filter((mission) => mission.destination === destination && !mission.location.coordinates);
  const activeSite = sites.find((site) => site.id === activeId) ?? sites[0];

  return (
    <section className="exploration" id="exploration" aria-labelledby="exploration-title">
      <div className="section-heading exploration-heading">
        <div>
          <div className="eyebrow">SURFACE INDEX / VERIFIED SITES</div>
          <h2 id="exploration-title">Recorded surface sites</h2>
          <p className="section-description">Explore published landing, deployment, and parking coordinates. This position plot is not a terrain map, and each point states which site it represents.</p>
        </div>
        <span className="collection-count">{sites.length} PLOTTED · {unknownSites.length} UNCONFIRMED</span>
      </div>

      <div className="exploration-controls" role="group" aria-label="Choose planetary body">
        {["Moon", "Mars"].map((world) => (
          <button key={world} type="button" className={destination === world ? "active" : ""} aria-pressed={destination === world} onClick={() => { onDestinationChange(world); setActiveId(null); }}>
            {world}
          </button>
        ))}
      </div>

      <div className="map-layout">
        <div className={`coordinate-map ${destination.toLowerCase()}`}>
          <svg viewBox={`0 0 ${MAP.width} ${MAP.height}`} role="group" aria-label={`${destination} equirectangular coordinate plot`}>
            {[-60, -30, 0, 30, 60].map((latitude) => {
              const { y } = project(latitude, 0);
              return <g key={`lat-${latitude}`}><line x1={MAP.paddingX} x2={MAP.width - MAP.paddingX} y1={y} y2={y} /><text x="6" y={y + 3}>{latitude}°</text></g>;
            })}
            {[-120, -60, 0, 60, 120].map((longitude) => {
              const { x } = project(0, longitude);
              return <g key={`lon-${longitude}`}><line x1={x} x2={x} y1={MAP.paddingY} y2={MAP.height - MAP.paddingY} /><text x={x} y={MAP.height - 8} textAnchor="middle">{longitude}°</text></g>;
            })}
            <rect className="map-frame" x={MAP.paddingX} y={MAP.paddingY} width={MAP.width - MAP.paddingX * 2} height={MAP.height - MAP.paddingY * 2} />
            {sites.map((site, index) => {
              const { x, y } = project(site.location.coordinates.latitude, site.location.coordinates.longitude);
              const nearPrevious = index > 0 && Math.hypot(x - project(sites[index - 1].location.coordinates.latitude, sites[index - 1].location.coordinates.longitude).x, y - project(sites[index - 1].location.coordinates.latitude, sites[index - 1].location.coordinates.longitude).y) < 16;
              const offsetX = nearPrevious ? (index % 2 ? -9 : 9) : 0;
              return <g key={site.id} className={`map-marker ${activeSite?.id === site.id ? "selected" : ""}`} role="button" tabIndex="0" aria-label={`${site.equipment.name}, ${site.location.coordinates.display}. ${site.location.coordinateMeaning}`} onClick={() => setActiveId(site.id)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActiveId(site.id); } }}>
                {offsetX !== 0 && <line className="marker-leader" x1={x} y1={y} x2={x + offsetX} y2={y} />}
                <circle className="marker-hit" cx={x + offsetX} cy={y} r="15" /><circle className="marker-ring" cx={x + offsetX} cy={y} r="8" /><circle className="marker-dot" cx={x + offsetX} cy={y} r="3" />
              </g>;
            })}
          </svg>
          <span className="map-caption">{destination.toUpperCase()} · EQUIRECTANGULAR COORDINATE PLOT</span>
        </div>

        <aside className="map-details" aria-live="polite">
          {activeSite ? <>
            <div className="eyebrow">SELECTED FIELD FILE / {activeSite.id}</div>
            <h3>{activeSite.equipment.name}</h3>
            <p>{activeSite.location.siteName}</p>
            <dl>
              <dt>Published coordinates</dt><dd>{activeSite.location.coordinates.display}</dd>
              <dt>Point represents</dt><dd>{activeSite.location.coordinateMeaning}</dd>
              <dt>Coordinate source</dt><dd><a className="coordinate-source" href={activeSite.location.coordinateSource} target="_blank" rel="noreferrer">Open source record ↗</a></dd>
              <dt>Mission</dt><dd>{activeSite.mission.name}</dd>
            </dl>
            <button type="button" className="map-record-link" onClick={() => onOpenRecord(activeSite)}>OPEN MISSION FILE <span aria-hidden="true">↗</span></button>
          </> : <p>No verified coordinate is available for plotting.</p>}
          {unknownSites.length > 0 && <div className="unmapped-sites"><span className="eyebrow">NOT PLOTTED</span>{unknownSites.map((site) => <p key={site.id}>{site.equipment.name} — coordinates not established in this archive.</p>)}</div>}
        </aside>
      </div>
      <p className="map-method">Coordinates are displayed as published by the cited sources. The plot normalizes latitude/longitude for orientation and does not imply positional precision, terrain, or a shared datum.</p>
    </section>
  );
}
