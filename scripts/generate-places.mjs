// Data: © OpenStreetMap contributors, ODbL 1.0 (https://www.openstreetmap.org/copyright).
// Attribution lives in README.md — do not remove it if this script's
// output is what ends up shipping.

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, '../src/data/places.geojson');

const OVERPASS_ENDPOINT = 'https://overpass-api.de/api/interpreter';

// Trinational region bounding box: south,west,north,east. Generous enough
// to include Foz do Iguaçu, Ciudad del Este, Presidente Franco and Puerto
// Iguazú with margin, without pulling in unrelated neighboring towns.
const BBOX = '-25.78,-54.68,-25.35,-54.35';

// Each block keeps a single tag family together so the resulting query is
// legible and each line's purpose is traceable back to a category below.
// `[name]` is required on most blocks specifically to satisfy "no POI
// without a name" — tourism=attraction/museum/viewpoint are the exception,
// since some genuinely-unnamed natural viewpoints are still worth a pin.
export const OVERPASS_QUERY = `
[out:json][timeout:90];
(
  node["tourism"~"^(attraction|museum|viewpoint|zoo|theme_park|artwork)$"](${BBOX});
  way["tourism"~"^(attraction|museum|viewpoint|zoo|theme_park|artwork)$"](${BBOX});

  node["historic"]["name"](${BBOX});
  way["historic"]["name"](${BBOX});

  node["amenity"="place_of_worship"]["name"](${BBOX});
  way["amenity"="place_of_worship"]["name"](${BBOX});

  node["leisure"~"^(park|water_park|nature_reserve)$"]["name"](${BBOX});
  way["leisure"~"^(park|water_park|nature_reserve)$"]["name"](${BBOX});

  node["natural"~"^(waterfall|beach)$"]["name"](${BBOX});

  node["tourism"~"^(hotel|hostel|guest_house|resort)$"]["name"](${BBOX});
  way["tourism"~"^(hotel|hostel|guest_house|resort)$"]["name"](${BBOX});

  node["amenity"~"^(restaurant|cafe|bar)$"]["name"](${BBOX});
  way["amenity"~"^(restaurant|cafe|bar)$"]["name"](${BBOX});

  node["shop"~"^(mall|department_store)$"]["name"](${BBOX});
  way["shop"~"^(mall|department_store)$"]["name"](${BBOX});

  node["amenity"~"^(casino|cinema)$"]["name"](${BBOX});
  node["leisure"="amusement_arcade"]["name"](${BBOX});
);
out center tags;
`.trim();

// Maps OSM tag values to this project's PlaceCategory. Deliberately not
// exhaustive — anything not matched here is dropped in normalize(),
// which is the actual mechanism for "don't copy all of OSM in blindly".
function categorize(tags) {
  if (tags.tourism === 'hotel' || tags.tourism === 'hostel' || tags.tourism === 'guest_house' || tags.tourism === 'resort') {
    return 'hotel';
  }
  if (tags.amenity === 'restaurant' || tags.amenity === 'cafe' || tags.amenity === 'bar') {
    return 'gastronomy';
  }
  if (tags.shop === 'mall' || tags.shop === 'department_store') {
    return 'shopping';
  }
  if (tags.amenity === 'casino' || tags.amenity === 'cinema' || tags.leisure === 'amusement_arcade') {
    return 'entertainment';
  }
  if (tags.natural === 'waterfall' || tags.natural === 'beach' || tags.leisure === 'nature_reserve') {
    return 'nature';
  }
  if (tags.leisure === 'park' || tags.leisure === 'water_park') {
    return 'nature';
  }
  if (tags.amenity === 'place_of_worship' || tags.tourism === 'museum' || tags.tourism === 'artwork') {
    return 'culture';
  }
  if (tags.historic) {
    return 'landmark';
  }
  if (tags.tourism === 'viewpoint') {
    return 'landmark';
  }
  if (tags.tourism === 'zoo' || tags.tourism === 'theme_park') {
    return 'entertainment';
  }
  if (tags.tourism === 'attraction') {
    return 'culture';
  }
  return null;
}

// Coarse, approximate boxes — same limitation as scripts/validate-places.mjs
// (see that file and the delivery report): good enough to route a point to
// a city for this product, not a substitute for a real admin-boundary
// lookup. A point outside all three is dropped rather than guessed.
import { locateCityCountry } from './geo-utils.mjs';

function elementCoordinates(element) {
  if (element.type === 'node') {
    return [element.lon, element.lat];
  }
  // way/relation: Overpass's `out center` adds a `.center` point — this is
  // what makes those elements representable as a single Point at all.
  if (element.center) {
    return [element.center.lon, element.center.lat];
  }
  return null;
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function normalize(elements) {
  const byId = new Map();
  const seenNameLocation = new Map(); // "country:slug" -> feature, for dedup

  for (const element of elements) {
    const tags = element.tags ?? {};
    const name = tags.name?.trim();
    if (!name) {
      continue; // "não incluir... POI sem informação mínima"
    }

    const category = categorize(tags);
    if (!category) {
      continue;
    }

    const coords = elementCoordinates(element);
    if (!coords) {
      continue;
    }
    const [lon, lat] = coords;

    const located = locateCityCountry(lon, lat);
    if (!located) {
      continue; // outside all known city boxes — not this product's region
    }

    const osmId = `${element.type[0]}${element.id}`; // e.g. "n123", "w456"
    if (byId.has(osmId)) {
      continue;
    }

    const slug = slugify(name);
    const dedupeKey = `${located.country}:${slug}`;
    const existing = seenNameLocation.get(dedupeKey);
    if (existing) {
      // Same normalized name in the same country — almost certainly the
      // same real place mapped as more than one OSM element (e.g. a node
      // for the building and a way for its footprint). Keep the first.
      continue;
    }

    const id = `${located.country.toLowerCase()}-${slug}`;

    const feature = {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [lon, lat] },
      properties: {
        id,
        name,
        country: located.country,
        city: located.city,
        category,
        description: tags.description?.trim() || '',
        osm_id: osmId,
        osm_type: element.type,
      },
    };

    byId.set(osmId, feature);
    seenNameLocation.set(dedupeKey, feature);
  }

  return [...byId.values()];
}

async function fetchOverpass(query) {
  const response = await fetch(OVERPASS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: query,
  });
  if (!response.ok) {
    throw new Error(`Overpass request failed: ${response.status} ${response.statusText}`);
  }
  const body = await response.json();
  return body.elements ?? [];
}

async function main() {
  console.log('Querying Overpass...');
  const elements = await fetchOverpass(OVERPASS_QUERY);
  console.log(`Received ${elements.length} raw elements.`);

  const features = normalize(elements);
  console.log(`Normalized to ${features.length} places after filtering/dedup.`);

  const geojson = { type: 'FeatureCollection', features };
  writeFileSync(OUTPUT_PATH, JSON.stringify(geojson, null, 2));
  console.log(`Wrote ${OUTPUT_PATH}`);
}

// Only auto-run when executed directly (`node scripts/generate-places.mjs`),
// not when imported by scripts/validate-places.mjs or a future test.
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
