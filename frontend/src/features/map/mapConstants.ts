import type { StyleSpecification } from 'maplibre-gl';

export type BasemapId = 'streets' | 'satellite';

export const STREETS_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

// EOX Sentinel-2 cloudless: no API key, CC BY-NC-SA (fits this non-commercial
// project), ~10m resolution. MapTiler Satellite was the alternative but
// needs a key even on its free tier — see report for the full comparison.
export const SATELLITE_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    satellite: {
      type: 'raster',
      tiles: ['https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg'],
      tileSize: 256,
      maxzoom: 13,
      attribution:
        'Sentinel-2 cloudless by <a href="https://s2maps.eu" target="_blank" rel="noreferrer">EOX IT Services GmbH</a>',
    },
  },
  layers: [{ id: 'satellite', type: 'raster', source: 'satellite' }],
};

export const ATTRACTIONS_SOURCE_ID = 'attractions';
export const ATTRACTIONS_LAYER_ID = 'attractions-points';

export const INITIAL_ZOOM = 12;
