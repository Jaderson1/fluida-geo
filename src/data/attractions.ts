import type { AttractionCollection } from '../types/attraction';

/**
 * DEVELOPMENT DATA — NOT PRODUCTION DATA.
 *
 * Small, hand-picked dataset used to build and test the map-first UI
 * before the real backend endpoint exists. Coordinates are approximate
 * (sourced from general place knowledge, not surveyed) — good enough to
 * place each point in the right city/country for UI work, not authoritative
 * for GIS analysis. This file is expected to be deleted once
 * `GET /api/v1/attractions` (or similar) exists on the backend — see
 * features/map/useAttractions.ts for the seam where that swap happens.
 *
 * Shape matches AttractionCollection exactly, so swapping this constant
 * for a fetched response later should not require touching any consumer.
 */
export const LOCAL_ATTRACTIONS: AttractionCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.4367, -25.6953] },
      properties: {
        id: 'br-cataratas',
        name: 'Cataratas do Iguaçu (lado brasileiro)',
        country: 'BR',
        city: 'Foz do Iguaçu',
        category: 'nature',
        description:
          'Trilha e mirantes do Parque Nacional do Iguaçu com vista panorâmica das quedas.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.5947, -25.5936] },
      properties: {
        id: 'br-marco-tres-fronteiras',
        name: 'Marco das Três Fronteiras',
        country: 'BR',
        city: 'Foz do Iguaçu',
        category: 'landmark',
        description:
          'Obelisco à beira do rio com vista para os pontos equivalentes na Argentina e no Paraguai.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.534, -25.47] },
      properties: {
        id: 'br-templo-chen-tien',
        name: 'Templo Budista Chen Tien',
        country: 'BR',
        city: 'Foz do Iguaçu',
        category: 'culture',
        description: 'Maior templo budista da América Latina, aberto à visitação.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.5892, -25.4083] },
      properties: {
        id: 'br-itaipu',
        name: 'Itaipu Binacional (centro de visitantes)',
        country: 'BR',
        city: 'Foz do Iguaçu',
        category: 'landmark',
        description: 'Usina hidrelétrica binacional Brasil-Paraguai; visitas guiadas à estrutura.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.6076, -25.5169] },
      properties: {
        id: 'py-ponte-amizade',
        name: 'Ponte da Amizade (lado paraguaio)',
        country: 'PY',
        city: 'Ciudad del Este',
        category: 'landmark',
        description: 'Ponte sobre o rio Paraná que liga Ciudad del Este a Foz do Iguaçu.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.6114, -25.5163] },
      properties: {
        id: 'py-microcentro',
        name: 'Microcentro de Ciudad del Este',
        country: 'PY',
        city: 'Ciudad del Este',
        category: 'shopping',
        description: 'Região comercial concentrada, conhecida pelo comércio de eletrônicos e importados.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.5828, -25.5606] },
      properties: {
        id: 'py-saltos-monday',
        name: 'Saltos del Monday',
        country: 'PY',
        city: 'Ciudad del Este',
        category: 'nature',
        description: 'Quedas d\u2019água menos conhecidas que as do Iguaçu, num afluente do Paraná.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.452, -25.672] },
      properties: {
        id: 'ar-cataratas',
        name: 'Cataratas del Iguazú (lado argentino)',
        country: 'AR',
        city: 'Puerto Iguazú',
        category: 'nature',
        description: 'Circuitos Superior e Inferior, incluindo a Garganta do Diabo.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.5814, -25.5978] },
      properties: {
        id: 'ar-hito-tres-fronteras',
        name: 'Hito Argentino Tres Fronteras',
        country: 'AR',
        city: 'Puerto Iguazú',
        category: 'landmark',
        description: 'Mirante argentino da tríplice fronteira, de frente para o marco brasileiro.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.576, -25.5985] },
      properties: {
        id: 'ar-costanera',
        name: 'Costanera de Puerto Iguazú',
        country: 'AR',
        city: 'Puerto Iguazú',
        category: 'gastronomy',
        description: 'Orla com restaurantes e vista para o encontro dos rios Iguaçu e Paraná.',
      },
    },
  ],
};

/** Approximate geographic centre of the trinational region, for the map's initial view. */
export const REGION_CENTER: [number, number] = [-54.585, -25.58];
