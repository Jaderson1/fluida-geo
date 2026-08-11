import type { AttractionCollection } from '../types/attraction';

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
        description: 'Templo budista aberto à visitação em Foz do Iguaçu.',
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
        description:
          'Usina hidrelétrica binacional Brasil-Paraguai com opções de visitação.',
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
        description:
          'Ponte sobre o rio Paraná que liga Ciudad del Este a Foz do Iguaçu.',
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
        description:
          'Região comercial concentrada, conhecida pelo comércio de eletrônicos e importados.',
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
        description:
          'Conjunto de quedas d’água localizado na região de Presidente Franco.',
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
        description:
          'Circuitos de visitação do Parque Nacional Iguazú, incluindo a Garganta do Diabo.',
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
        description:
          'Ponto turístico argentino com vista para a região da tríplice fronteira.',
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
        description:
          'Orla de Puerto Iguazú próxima ao encontro dos rios Iguaçu e Paraná.',
      },
    },
  ],
};

export const REGION_CENTER: [number, number] = [-54.585, -25.58];