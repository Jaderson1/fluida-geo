import type { PlaceCategory, CountryCode } from '../../types/place';

export const CATEGORY_LABELS: Record<PlaceCategory, string> = {
  nature: 'Natureza',
  culture: 'Cultura',
  gastronomy: 'Gastronomia',
  shopping: 'Compras',
  landmark: 'Marcos',
  hotel: 'Hotéis',
  entertainment: 'Entretenimento',
};

export const CATEGORY_ORDER: PlaceCategory[] = [
  'nature',
  'culture',
  'gastronomy',
  'shopping',
  'landmark',
  'hotel',
  'entertainment',
];

export const CATEGORY_COLOR: Record<PlaceCategory, string> = {
  nature: '#4c9a6a',
  culture: '#b08cd9',
  gastronomy: '#e0935a',
  shopping: '#5fa0c9',
  landmark: '#d4a24c',
  hotel: '#c9738a',
  entertainment: '#d15c5c',
};

export const COUNTRY_LABELS: Record<CountryCode, string> = {
  BR: 'BR',
  PY: 'PY',
  AR: 'AR',
};

export const COUNTRY_ORDER: CountryCode[] = ['BR', 'PY', 'AR'];

export const COUNTRY_ACCENT: Record<CountryCode, string> = {
  BR: 'var(--country-br)',
  PY: 'var(--country-py)',
  AR: 'var(--country-ar)',
};