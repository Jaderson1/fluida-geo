import rawPlaces from './places.geojson?raw';
import type { PlaceCollection } from '../types/place';

// ?raw (not a bare import) because Vite's default build only recognizes
// .json for automatic JSON parsing — .geojson falls through to being
// treated as a JS module and fails to build. Parsing the raw text
// ourselves works the same in dev and in the production build.
export const LOCAL_PLACES = JSON.parse(rawPlaces) as PlaceCollection;

export const REGION_CENTER: [number, number] = [-54.585, -25.58];