/** Projects latitude and longitude into a simple equirectangular plot. */
export function projectCoordinates(latitude, longitude, width = 720, height = 360, paddingX = 48, paddingY = 30) {
  return {
    x: paddingX + ((longitude + 180) / 360) * (width - 2 * paddingX),
    y: paddingY + ((90 - latitude) / 180) * (height - 2 * paddingY),
  };
}
