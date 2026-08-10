import type { AttractionFeature } from '../../types/attraction';

export interface AttractionStats {
  attractions: number;
  cities: number;
  countries: number;
  categories: number;
}

/** Derives counts from whatever feature set is passed in — never hardcoded. */
export function computeStats(features: AttractionFeature[]): AttractionStats {
  const cities = new Set(features.map((f) => f.properties.city));
  const countries = new Set(features.map((f) => f.properties.country));
  const categories = new Set(features.map((f) => f.properties.category));

  return {
    attractions: features.length,
    cities: cities.size,
    countries: countries.size,
    categories: categories.size,
  };
}
