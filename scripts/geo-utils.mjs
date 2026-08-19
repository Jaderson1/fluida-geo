// Shared by generate-places.mjs and validate-places.mjs. Kept in one file
// after the two scripts briefly used different, inconsistent heuristics
// during development — a box-based version in one and a stale one in the
// other. Single source of truth now.

// Loose region box: catches gross errors (wrong hemisphere, a swapped
// lat/lon, a stray decimal) without pretending to know a real boundary.
export const REGION_BOUNDS = { minLon: -55.5, maxLon: -53.5, minLat: -26.3, maxLat: -24.8 };

export function inRegion(lon, lat) {
  return (
    lon >= REGION_BOUNDS.minLon &&
    lon <= REGION_BOUNDS.maxLon &&
    lat >= REGION_BOUNDS.minLat &&
    lat <= REGION_BOUNDS.maxLat
  );
}

// from the Falls, so a single "city center" point put every falls-area
// attraction closer to the wrong country's downtown than its own — this
// was caught by running the validator against the real dataset (see the
// delivery report), not anticipated in advance. A tourism dataset clusters
// heavily around landmarks far from downtown; one centroid per city can't
// represent that.
export const CITY_CENTROIDS = [
  { country: 'BR', city: 'Foz do Iguaçu', lon: -54.585, lat: -25.545 },
  { country: 'BR', city: 'Foz do Iguaçu', lon: -54.45, lat: -25.68 }, // Cataratas/Av. das Cataratas area
  { country: 'PY', city: 'Ciudad del Este', lon: -54.611, lat: -25.51 },
  { country: 'PY', city: 'Presidente Franco', lon: -54.635, lat: -25.56 },
  { country: 'AR', city: 'Puerto Iguazú', lon: -54.575, lat: -25.598 },
  { country: 'AR', city: 'Puerto Iguazú', lon: -54.46, lat: -25.67 }, // Parque Nacional Iguazú area
];

export function locateCityCountry(lon, lat) {
  if (!inRegion(lon, lat)) {
    return null;
  }
  let closest = null;
  let closestDist = Infinity;
  for (const centroid of CITY_CENTROIDS) {
    const dist = (lon - centroid.lon) ** 2 + (lat - centroid.lat) ** 2;
    if (dist < closestDist) {
      closestDist = dist;
      closest = centroid;
    }
  }
  return closest ? { country: closest.country, city: closest.city } : null;
}
