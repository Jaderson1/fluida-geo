/**
 * Domain types for tourist attractions.
 *
 * AttractionProperties is written to already match the shape the future
 * FastAPI backend should return inside each GeoJSON Feature's `properties`
 * (see docs on the backend's planned PostGIS -> GeoJSON contract). Local
 * dev data and a future API response should both satisfy this type without
 * changes here.
 */

export type CountryCode = 'BR' | 'PY' | 'AR';

export type AttractionCategory =
  | 'nature'
  | 'culture'
  | 'gastronomy'
  | 'shopping'
  | 'landmark';

export interface AttractionProperties {
  id: string;
  name: string;
  country: CountryCode;
  city: string;
  category: AttractionCategory;
  description: string;
}

/** A single attraction as a GeoJSON Point feature. */
export type AttractionFeature = GeoJSON.Feature<GeoJSON.Point, AttractionProperties>;

/** The full local/dev dataset, or a future API response, as FeatureCollection. */
export type AttractionCollection = GeoJSON.FeatureCollection<
  GeoJSON.Point,
  AttractionProperties
>;
