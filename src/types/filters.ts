import type { PlaceCategory, CountryCode } from './place';

export type RegionFilter = CountryCode | 'ALL';

export type CategoryFilter = PlaceCategory | 'ALL';

export interface FilterState {
  region: RegionFilter;
  category: CategoryFilter;
}

export const DEFAULT_FILTER_STATE: FilterState = {
  region: 'ALL',
  category: 'ALL',
};

export type SelectedPlaceId = string | null;