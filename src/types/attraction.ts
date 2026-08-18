// AttractionProperties matches the shape the future backend should return
// inside each GeoJSON Feature's properties, so local data and a real API
// response both satisfy this type unchanged.

export type CountryCode = 'BR' | 'PY' | 'AR';

export type AttractionCategory =
  | 'nature'
  | 'culture'
  | 'gastronomy'
  | 'shopping'
  | 'landmark'
  | 'hotel';

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