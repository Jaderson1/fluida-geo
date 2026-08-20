export const REGION_BOUNDS = {
  minLon: -55.5,
  maxLon: -53.5,
  minLat: -26.3,
  maxLat: -24.8,
};

export function inRegion(lon, lat) {
  return (
    lon >= REGION_BOUNDS.minLon &&
    lon <= REGION_BOUNDS.maxLon &&
    lat >= REGION_BOUNDS.minLat &&
    lat <= REGION_BOUNDS.maxLat
  );
}

export const CITY_CENTROIDS = [
  { country: 'BR', city: 'Foz do Iguaçu', lon: -54.585, lat: -25.545 },
  { country: 'BR', city: 'Foz do Iguaçu', lon: -54.45, lat: -25.68 },

  { country: 'PY', city: 'Ciudad del Este', lon: -54.611, lat: -25.51 },
  { country: 'PY', city: 'Presidente Franco', lon: -54.635, lat: -25.56 },

  { country: 'AR', city: 'Puerto Iguazú', lon: -54.575, lat: -25.598 },
  { country: 'AR', city: 'Puerto Iguazú', lon: -54.46, lat: -25.67 },
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

  return closest
    ? { country: closest.country, city: closest.city }
    : null;
}