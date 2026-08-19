import type { PlaceFeature } from '../../types/place';

export interface PlaceStats {
  places: number;
  cities: number;
  countries: number;
  categories: number;
}

export function computeStats(features: PlaceFeature[]): PlaceStats {
  const cities = new Set(features.map((f) => f.properties.city));
  const countries = new Set(features.map((f) => f.properties.country));
  const categories = new Set(features.map((f) => f.properties.category));

  return {
    places: features.length,
    cities: cities.size,
    countries: countries.size,
    categories: categories.size,
  };
}