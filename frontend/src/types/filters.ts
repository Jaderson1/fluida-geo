import type { AttractionCategory, CountryCode } from './attraction';

/** Region filter: a specific country, or all three. */
export type RegionFilter = CountryCode | 'ALL';

/** Category filter: a single category, or all categories. */
export type CategoryFilter = AttractionCategory | 'ALL';

export interface FilterState {
  region: RegionFilter;
  category: CategoryFilter;
}

export const DEFAULT_FILTER_STATE: FilterState = {
  region: 'ALL',
  category: 'ALL',
};

/** id of the selected attraction, or null when nothing is selected. */
export type SelectedAttractionId = string | null;
