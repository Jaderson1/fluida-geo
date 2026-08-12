import type { AttractionCollection } from '../types/attraction';

// Approximate/dev coordinates. Cataratas points are placeholders pending a
// decision on whether they should mark the entrance, viewpoint, or falls area.
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
      geometry: { type: 'Point', coordinates: [-54.590921, -25.588278] },
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
      geometry: { type: 'Point', coordinates: [-54.600031, -25.473832] },
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
      geometry: { type: 'Point', coordinates: [-54.585165, -25.447023] },
      properties: {
        id: 'br-itaipu',
        name: 'Itaipu Binacional — Centro de Recepção de Visitantes',
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
      geometry: { type: 'Point', coordinates: [-54.6087, -25.5119] },
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
      geometry: { type: 'Point', coordinates: [-54.633361, -25.561278] },
      properties: {
        id: 'py-saltos-monday',
        name: 'Saltos del Monday',
        country: 'PY',
        city: 'Presidente Franco',
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
      geometry: { type: 'Point', coordinates: [-54.59077, -25.59476] },
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
      geometry: { type: 'Point', coordinates: [-54.5866, -25.5945] },
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

export const REGION_CENTER: [number, number] = [-54.585, -25.58];
