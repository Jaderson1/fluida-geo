#!/usr/bin/env node
// Validates src/data/places.geojson. Run with: node scripts/validate-places.mjs
// (or `pnpm validate:places`). Exits non-zero on any hard failure.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { REGION_BOUNDS, inRegion, locateCityCountry } from './geo-utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, '../src/data/places.geojson');

const VALID_CATEGORIES = new Set([
  'nature',
  'culture',
  'gastronomy',
  'shopping',
  'landmark',
  'hotel',
  'entertainment',
]);
const VALID_COUNTRIES = new Set(['BR', 'PY', 'AR']);

function main() {
  const raw = readFileSync(DATA_PATH, 'utf8');
  const geojson = JSON.parse(raw);
  const features = geojson.features ?? [];

  const errors = [];
  const warnings = [];
  const seenIds = new Set();
  const coordKey = new Map(); // "lon,lat" -> [ids]

  for (const feature of features) {
    const p = feature.properties ?? {};
    const label = p.id ?? p.name ?? '(sem id)';

    if (feature.type !== 'Feature') {
      errors.push(`${label}: type não é "Feature"`);
    }
    if (feature.geometry?.type !== 'Point') {
      errors.push(`${label}: geometry.type não é "Point"`);
    }

    if (!p.id || typeof p.id !== 'string') {
      errors.push(`${label}: id ausente ou não-string`);
    } else if (seenIds.has(p.id)) {
      errors.push(`${p.id}: id duplicado`);
    } else {
      seenIds.add(p.id);
    }

    if (!p.name || typeof p.name !== 'string' || p.name.trim() === '') {
      errors.push(`${label}: name ausente ou vazio`);
    }

    if (!VALID_CATEGORIES.has(p.category)) {
      errors.push(`${label}: category inválida "${p.category}"`);
    }

    if (!VALID_COUNTRIES.has(p.country)) {
      errors.push(`${label}: country inválido "${p.country}"`);
    }

    if (!p.city || typeof p.city !== 'string' || p.city.trim() === '') {
      errors.push(`${label}: city ausente ou vazia`);
    }

    // Coordinate checks below all depend on a well-formed [lon, lat] pair —
    // skip them (but keep the property errors already recorded above) if
    // it's not even that shape.
    const coords = feature.geometry?.coordinates;
    if (!Array.isArray(coords) || coords.length !== 2) {
      errors.push(`${label}: geometry.coordinates não é um par [longitude, latitude]`);
      continue;
    }
    const [lon, lat] = coords;
    if (typeof lon !== 'number' || typeof lat !== 'number' || Number.isNaN(lon) || Number.isNaN(lat)) {
      errors.push(`${label}: coordenadas não numéricas`);
      continue;
    }

    // This region is entirely in the southern/western hemisphere — a
    // positive lon or lat here is the classic [lat, lon] swap bug.
    if (lon > 0 || lat > 0) {
      errors.push(`${label}: coordenada positiva (${lon}, ${lat}) — suspeita de inversão lat/lon`);
    }
    if (Math.abs(lat) > 30) {
      warnings.push(`${label}: |latitude| incomum (${lat}) para esta região — revisar manualmente`);
    }

    if (!inRegion(lon, lat)) {
      errors.push(`${label}: fora da caixa geográfica da região (${lon}, ${lat})`);
    } else {
      // Same nearest-centroid heuristic generate-places.mjs uses to assign
      // country/city in the first place — flags a declared country/city
      // that disagrees with where the coordinate actually sits. Heuristic,
      // not a boundary authority (see report): warning, not a failure.
      const located = locateCityCountry(lon, lat);
      if (located && (located.country !== p.country || located.city !== p.city)) {
        warnings.push(
          `${label}: mais próximo do centróide de ${located.city}/${located.country}, mas registrado como ${p.city}/${p.country} — checar`,
        );
      }
    }

    const key = `${lon.toFixed(4)},${lat.toFixed(4)}`;
    if (!coordKey.has(key)) {
      coordKey.set(key, []);
    }
    coordKey.get(key).push(label);
  }

  // Same-complex places (e.g. Museu de Cera + Vale dos Dinossauros) sharing
  // a coordinate is expected — a warning to double-check, never an error.
  for (const [key, ids] of coordKey) {
    if (ids.length > 1) {
      warnings.push(`coordenada repetida (${key}) em: ${ids.join(', ')} — confirmar que não é duplicata`);
    }
  }

  console.log(`Total de lugares: ${features.length}`);
  console.log(`Erros: ${errors.length}`);
  errors.forEach((e) => console.log(`  ERRO: ${e}`));
  console.log(`Avisos: ${warnings.length}`);
  warnings.forEach((w) => console.log(`  AVISO: ${w}`));
  console.log(`(Caixa regional usada: lon ${REGION_BOUNDS.minLon}..${REGION_BOUNDS.maxLon}, lat ${REGION_BOUNDS.minLat}..${REGION_BOUNDS.maxLat})`);

  if (errors.length > 0) {
    process.exitCode = 1;
  }
}

main();