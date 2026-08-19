# Fluida Geo

Explorer geoespacial da região trinacional (Foz do Iguaçu, Ciudad del Este/Presidente Franco, Puerto Iguazú). React + TypeScript + Vite + MapLibre GL JS, com layout responsivo via `@fluida/core`/`@fluida/react`.

## Rodando localmente

```
pnpm install
pnpm dev
```

`pnpm build` / `pnpm lint` para build e lint. `node scripts/validate-places.mjs` valida o dataset local.

## Dados

O catálogo de lugares (`src/data/places.geojson`) combina:

- pesquisa manual verificada (nome, funcionamento e localização confirmados por fonte atual) para a maior parte dos registros atuais;
- descoberta via [OpenStreetMap](https://www.openstreetmap.org/copyright) através da Overpass API, para expansões futuras via `scripts/generate-places.mjs`.

Dados derivados do OpenStreetMap são © colaboradores do OpenStreetMap, licenciados sob a [Open Database License (ODbL) 1.0](https://opendatacommons.org/licenses/odbl/1.0/). O basemap "Mapa" (OpenFreeMap/Liberty) já inclui a atribuição correspondente automaticamente via MapLibre — não remova o `AttributionControl` padrão.

O basemap "Satélite" usa imagens Sentinel-2 cloudless da EOX IT Services GmbH (ver atribuição no próprio mapa).