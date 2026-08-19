#!/usr/bin/env node
// Validates src/data/places.geojson. Run with: node scripts/validate-places.mjs
// Exits non-zero on any hard failure so it can gate CI later.

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
    const [lon, lat] = feature.geometry?.coordinates ?? [];
    const label = p.id ?? p.name ?? '(sem id)';

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

    if (typeof lon !== 'number' || typeof lat !== 'number' || Number.isNaN(lon) || Number.isNaN(lat)) {
      errors.push(`${label}: coordenadas ausentes ou não numéricas`);
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
      // that disagrees with where the coordinate actually sits, which is
      // exactly the "BR point physically in Ciudad del Este" case this
      // check exists for. A heuristic, not a boundary authority: it's a
      // warning, not a hard failure.
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