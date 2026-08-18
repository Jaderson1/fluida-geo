import type { AttractionCollection } from '../types/attraction';

// Approximate/dev coordinates, derived from published addresses and route
// km-markers rather than survey data. Cataratas points are placeholders
// pending a decision on whether they should mark entrance, viewpoint, or
// falls area; Parque Nacional do Iguaçu itself is represented by those two
// points rather than as a separate pin.
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

    // --- Atrações adicionadas nesta expansão ---
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.4373, -25.6873] },
      properties: {
        id: 'br-parque-das-aves',
        name: 'Parque das Aves',
        country: 'BR',
        city: 'Foz do Iguaçu',
        category: 'nature',
        description:
          'Viveiros de imersão com aves da Mata Atlântica, ao lado da entrada do Parque Nacional do Iguaçu.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.556, -25.578] },
      properties: {
        id: 'br-dreams-park-show',
        name: 'Dreams Park Show (Museu de Cera e Vale dos Dinossauros)',
        country: 'BR',
        city: 'Foz do Iguaçu',
        category: 'culture',
        description:
          'Complexo com museu de cera, réplicas de dinossauros animatrônicos e exposição de miniaturas de monumentos.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.548, -25.573] },
      properties: {
        id: 'br-wonder-park-foz',
        name: 'Wonder Park Foz (Movie Cars e Roda Gigante Yup Star)',
        country: 'BR',
        city: 'Foz do Iguaçu',
        category: 'culture',
        description:
          'Parque de entretenimento com museu de carros de cinema e roda-gigante panorâmica.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.575, -25.535] },
      properties: {
        id: 'br-mesquita-omar-al-khattab',
        name: 'Mesquita Omar Ibn Al-Khattab',
        country: 'BR',
        city: 'Foz do Iguaçu',
        category: 'culture',
        description:
          'Mesquita da comunidade islâmica de Foz do Iguaçu, inaugurada em 1983 e aberta a visitas guiadas.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.58, -25.415] },
      properties: {
        id: 'br-refugio-bela-vista',
        name: 'Refúgio Biológico Bela Vista',
        country: 'BR',
        city: 'Foz do Iguaçu',
        category: 'nature',
        description:
          'Área de proteção da Itaipu Binacional com trilha guiada por fauna e flora nativas da região.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.555, -25.615] },
      properties: {
        id: 'ar-la-aripuca',
        name: 'La Aripuca',
        country: 'AR',
        city: 'Puerto Iguazú',
        category: 'culture',
        description:
          'Construção de grande porte em madeira nativa recuperada, com foco educativo sobre a selva misionera.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.553, -25.617] },
      properties: {
        id: 'ar-guira-oga',
        name: 'Güira Oga',
        country: 'AR',
        city: 'Puerto Iguazú',
        category: 'nature',
        description: 'Refúgio de resgate e reabilitação de aves e outros animais silvestres da selva misionera.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.596, -25.556] },
      properties: {
        id: 'ar-duty-free-shop',
        name: 'Duty Free Shop Puerto Iguazú',
        country: 'AR',
        city: 'Puerto Iguazú',
        category: 'shopping',
        description: 'Loja livre de impostos próxima à fronteira, com lojas temáticas de marcas internacionais.',
      },
    },

    // --- Restaurantes ---
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.56, -25.57] },
      properties: {
        id: 'br-restaurant-rafain',
        name: 'Rafain Churrascaria Show',
        country: 'BR',
        city: 'Foz do Iguaçu',
        category: 'gastronomy',
        description: 'Churrascaria tradicional com buffet completo e show folclórico latino-americano.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.573, -25.537] },
      properties: {
        id: 'br-restaurant-baru',
        name: 'Baru Gastronomia',
        country: 'BR',
        city: 'Foz do Iguaçu',
        category: 'gastronomy',
        description: 'Casa autoral com cardápio contemporâneo, do café da manhã ao jantar.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.588, -25.52] },
      properties: {
        id: 'br-restaurant-confins',
        name: 'Confins Steakhouse',
        country: 'BR',
        city: 'Foz do Iguaçu',
        category: 'gastronomy',
        description: 'Referência em carnes no centro de Foz do Iguaçu.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.586, -25.522] },
      properties: {
        id: 'br-restaurant-castelo-libanes',
        name: 'Castelo Libanês',
        country: 'BR',
        city: 'Foz do Iguaçu',
        category: 'gastronomy',
        description: 'Cozinha árabe tradicional, com homus, quibes e cordeiro, próximo ao centro.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.435, -25.69] },
      properties: {
        id: 'br-restaurant-porto-canoas',
        name: 'Porto Canoas',
        country: 'BR',
        city: 'Foz do Iguaçu',
        category: 'gastronomy',
        description: 'Restaurante dentro do Parque Nacional do Iguaçu, com vista para as quedas.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.572, -25.598] },
      properties: {
        id: 'ar-restaurant-la-rueda',
        name: 'La Rueda 1975',
        country: 'AR',
        city: 'Puerto Iguazú',
        category: 'gastronomy',
        description: 'Um dos restaurantes mais tradicionais de Puerto Iguazú, com clássicos da culinária argentina.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.57, -25.601] },
      properties: {
        id: 'ar-restaurant-quincho',
        name: 'El Quincho del Tío Querido',
        country: 'AR',
        city: 'Puerto Iguazú',
        category: 'gastronomy',
        description: 'Parrilla com mais de 30 anos de tradição e show noturno de folclore e tango.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.574, -25.599] },
      properties: {
        id: 'ar-restaurant-aqva',
        name: 'Aqva Restaurante Iguazú',
        country: 'AR',
        city: 'Puerto Iguazú',
        category: 'gastronomy',
        description: 'Pratos regionais com peixes dos rios Paraná e Iguaçu.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.611, -25.509] },
      properties: {
        id: 'py-restaurant-sax-palace',
        name: 'Sax Palace',
        country: 'PY',
        city: 'Ciudad del Este',
        category: 'gastronomy',
        description: 'Restaurante nos andares superiores do edifício Sax, com cozinha internacional e adega própria.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.605, -25.512] },
      properties: {
        id: 'py-restaurant-patussi',
        name: 'Churrasqueria Patussi Grill',
        country: 'PY',
        city: 'Ciudad del Este',
        category: 'gastronomy',
        description: 'Churrascaria ao estilo brasileiro bem avaliada na região.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.615, -25.5] },
      properties: {
        id: 'py-restaurant-belsit',
        name: 'Belsit di Giorgio',
        country: 'PY',
        city: 'Ciudad del Este',
        category: 'gastronomy',
        description: 'Restaurante italiano próximo ao Lago da República.',
      },
    },

    // --- Hotéis ---
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.439, -25.693] },
      properties: {
        id: 'br-hotel-cataratas-belmond',
        name: 'Hotel das Cataratas, A Belmond Hotel',
        country: 'BR',
        city: 'Foz do Iguaçu',
        category: 'hotel',
        description: 'Único hotel dentro do Parque Nacional do Iguaçu, em casarão de estilo colonial português.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.55, -25.585] },
      properties: {
        id: 'br-hotel-bourbon-thermas',
        name: 'Bourbon Cataratas do Iguaçu Thermas Eco Resort',
        country: 'BR',
        city: 'Foz do Iguaçu',
        category: 'hotel',
        description: 'Eco resort com piscinas termais alimentadas pelo Aquífero Guarani.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.548, -25.595] },
      properties: {
        id: 'br-hotel-wish',
        name: 'Wish Foz do Iguaçu Resort',
        country: 'BR',
        city: 'Foz do Iguaçu',
        category: 'hotel',
        description: 'Resort com campo de golfe de 18 buracos e inspiração em vilas litorâneas.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.582, -25.53] },
      properties: {
        id: 'br-hotel-jl-bourbon',
        name: 'JL Hotel by Bourbon',
        country: 'BR',
        city: 'Foz do Iguaçu',
        category: 'hotel',
        description: 'Hotel bem avaliado voltado a viagens de negócios e lazer no centro de Foz.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.455, -25.68] },
      properties: {
        id: 'ar-hotel-gran-melia',
        name: 'Gran Meliá Iguazú',
        country: 'AR',
        city: 'Puerto Iguazú',
        category: 'hotel',
        description: 'Hotel cinco estrelas dentro do Parque Nacional Iguazú, com piscina de borda infinita.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.52, -25.64] },
      properties: {
        id: 'ar-hotel-loi-suites',
        name: 'Loi Suites Iguazú',
        country: 'AR',
        city: 'Puerto Iguazú',
        category: 'hotel',
        description: 'Hotel imerso na selva subtropical Iryapú, a poucos minutos do centro.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.575, -25.598] },
      properties: {
        id: 'ar-hotel-panoramic-grand',
        name: 'Panoramic Grand Hotel',
        country: 'AR',
        city: 'Puerto Iguazú',
        category: 'hotel',
        description: 'Hotel histórico no centro de Puerto Iguazú, com cassino próprio.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.61, -25.51] },
      properties: {
        id: 'py-hotel-acaray',
        name: 'Hotel Casino Acaray',
        country: 'PY',
        city: 'Ciudad del Este',
        category: 'hotel',
        description: 'Único hotel cinco estrelas de Ciudad del Este, à beira do rio Paraná.',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-54.608, -25.513] },
      properties: {
        id: 'py-hotel-rio-bourbon',
        name: 'Rio Hotel by Bourbon Ciudad Del Este',
        country: 'PY',
        city: 'Ciudad del Este',
        category: 'hotel',
        description: 'Hotel bem avaliado próximo à Ponte da Amizade.',
      },
    },
  ],
};

export const REGION_CENTER: [number, number] = [-54.585, -25.58];