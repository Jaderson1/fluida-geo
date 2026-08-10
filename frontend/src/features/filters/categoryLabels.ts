import type { AttractionCategory, CountryCode } from '../../types/attraction';

export const CATEGORY_LABELS: Record<AttractionCategory, string> = {
  nature: 'Natureza',
  culture: 'Cultura',
  gastronomy: 'Gastronomia',
  shopping: 'Compras',
  landmark: 'Marcos',
};

export const CATEGORY_ORDER: AttractionCategory[] = [
  'nature',
  'culture',
  'gastronomy',
  'shopping',
  'landmark',
];

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
