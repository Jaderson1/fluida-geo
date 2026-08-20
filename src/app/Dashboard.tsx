import { useEffect, useMemo, useState } from 'react';
import { FluidaText, useFluidaLayout } from '@fluida/react';
import { LOCAL_PLACES } from '../data/places';
import type { PlaceCollection } from '../types/place';
import { DEFAULT_FILTER_STATE, type FilterState, type SelectedPlaceId } from '../types/filters';
import FilterBar from '../features/filters/FilterBar';
import MapView from '../features/map/MapView';
import DetailsPanel from '../features/places/DetailsPanel';
import MetricsStrip from '../features/metrics/MetricsStrip';
import { computeStats } from '../features/metrics/computeStats';
import styles from './Dashboard.module.css';

function Dashboard() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTER_STATE);
  const [selectedId, setSelectedId] = useState<SelectedPlaceId>(null);

  const filteredFeatures = useMemo(() => {
    return LOCAL_PLACES.features.filter((feature) => {
      const matchesRegion = filters.region === 'ALL' || feature.properties.country === filters.region;
      const matchesCategory =
        filters.category === 'ALL' || feature.properties.category === filters.category;
      return matchesRegion && matchesCategory;
    });
  }, [filters]);

  const filteredCollection: PlaceCollection = useMemo(
    () => ({ type: 'FeatureCollection', features: filteredFeatures }),
    [filteredFeatures],
  );

  const selectedFeature = useMemo(
    () => filteredFeatures.find((feature) => feature.properties.id === selectedId) ?? null,
    [filteredFeatures, selectedId],
  );

  // Cleared here, not in the filter handler, so any change to
  // filteredFeatures keeps selection valid regardless of its cause.
  useEffect(() => {
    if (selectedId !== null && !filteredFeatures.some((feature) => feature.properties.id === selectedId)) {
      setSelectedId(null);
    }
  }, [filteredFeatures, selectedId]);

  const stats = useMemo(() => computeStats(filteredFeatures), [filteredFeatures]);

  // Reuses Fluida's own breakpoint (also used inside FluidaStack elsewhere)
  // instead of a second, possibly different, hand-picked media query.
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
        <DetailsPanel place={selectedFeature} hasFilteredResults={filteredFeatures.length > 0} />
      </main>

      <MetricsStrip stats={stats} />
    </div>
  );
}

export default Dashboard;