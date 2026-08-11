import { useEffect, useMemo, useState } from 'react';
import { FluidaText, useFluidaLayout } from '@fluida/react';
import { LOCAL_ATTRACTIONS } from '../data/attractions';
import type { AttractionCollection } from '../types/attraction';
import { DEFAULT_FILTER_STATE, type FilterState, type SelectedAttractionId } from '../types/filters';
import FilterBar from '../features/filters/FilterBar';
import MapView from '../features/map/MapView';
import DetailsPanel from '../features/attractions/DetailsPanel';
import MetricsStrip from '../features/metrics/MetricsStrip';
import { computeStats } from '../features/metrics/computeStats';
import styles from './Dashboard.module.css';

/**
 * Owns the two pieces of state that are genuinely cross-cutting —
 * filters and the current selection — and nothing else. MapView only
 * knows "here is data, tell me what got clicked"; DetailsPanel only
 * knows "here is a feature or null, render it". Neither talks to the
 * other directly, matching the brief:
 *
 *   Map -> selection event -> Dashboard state -> DetailsPanel
 */
function Dashboard() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTER_STATE);
  const [selectedId, setSelectedId] = useState<SelectedAttractionId>(null);

  const filteredFeatures = useMemo(() => {
    return LOCAL_ATTRACTIONS.features.filter((feature) => {
      const matchesRegion = filters.region === 'ALL' || feature.properties.country === filters.region;
      const matchesCategory =
        filters.category === 'ALL' || feature.properties.category === filters.category;
      return matchesRegion && matchesCategory;
    });
  }, [filters]);

  const filteredCollection: AttractionCollection = useMemo(
    () => ({ type: 'FeatureCollection', features: filteredFeatures }),
    [filteredFeatures],
  );

  const selectedFeature = useMemo(
    () => filteredFeatures.find((feature) => feature.properties.id === selectedId) ?? null,
    [filteredFeatures, selectedId],
  );

  // A filter change can remove the selected point from view. Clearing the
  // selection here (rather than in the filter handler) keeps this the one
  // place responsible for selection validity, regardless of what caused
  // the feature list to change.
  useEffect(() => {
    if (selectedId !== null && !filteredFeatures.some((feature) => feature.properties.id === selectedId)) {
      setSelectedId(null);
    }
  }, [filteredFeatures, selectedId]);

  const stats = useMemo(() => computeStats(filteredFeatures), [filteredFeatures]);

  // Single source of truth for "are we in mobile layout" across the whole
  // page — reusing Fluida's own breakpoint rather than a second, possibly
  // different, hand-picked media query value. FluidaStack elsewhere in
  // the tree reads this same breakpoint internally, so the page collapses
  // as one coordinated layout, not two layouts that happen to usually
  // agree.
  const { breakpoint } = useFluidaLayout();
  const isMobile = breakpoint === 'mobile';

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <FluidaText as="h1" className={styles.title}>
          Fluida Geo
        </FluidaText>
        <p className={styles.tagline}>Triple Border Explorer</p>
      </header>

      <FilterBar filters={filters} onChange={setFilters} />

      <main className={`${styles.main} ${isMobile ? styles.mainStacked : ''}`}>
        <MapView data={filteredCollection} selectedId={selectedId} onSelect={setSelectedId} />
        <DetailsPanel attraction={selectedFeature} />
      </main>

      <MetricsStrip stats={stats} />
    </div>
  );
}

export default Dashboard;
