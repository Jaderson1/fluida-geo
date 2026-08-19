export type CountryCode = 'BR' | 'PY' | 'AR';

export type PlaceCategory =
  | 'nature'
  | 'culture'
  | 'gastronomy'
  | 'shopping'
  | 'landmark'
  | 'hotel'
  | 'entertainment';

export interface PlaceProperties {
  id: string;
  name: string;
  country: CountryCode;
  city: string;
  category: PlaceCategory;
  description: string;
}

export type PlaceFeature = GeoJSON.Feature<GeoJSON.Point, PlaceProperties>;

export type PlaceCollection = GeoJSON.FeatureCollection<GeoJSON.Point, PlaceProperties>;