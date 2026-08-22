import { useCallback, useEffect, useMemo, useState } from 'react';
import { FluidaText, useFluidaLayout } from '@fluida/react';
import { fetchPlaces } from '../api/places';
import type { PlaceCollection } from '../types/place';
import { DEFAULT_FILTER_STATE, type FilterState, type SelectedPlaceId } from '../types/filters';
import FilterBar from '../features/filters/FilterBar';
import MapView from '../features/map/MapView';
import DetailsPanel from '../features/places/DetailsPanel';
import MetricsStrip from '../features/metrics/MetricsStrip';
import { computeStats } from '../features/metrics/computeStats';
import styles from './Dashboard.module.css';

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; places: PlaceCollection };

function Dashboard() {
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' });
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTER_STATE);
  const [selectedId, setSelectedId] = useState<SelectedPlaceId>(null);

  // Fetched once on mount, not once per filter click — filters run over
  // this in-memory result, same as they ran over the old static import.
  const loadPlaces = useCallback(() => {
    setLoadState({ status: 'loading' });
    fetchPlaces()
      .then((places) => setLoadState({ status: 'ready', places }))
      .catch(() => setLoadState({ status: 'error', message: 'Não foi possível carregar os lugares.' }));
  }, []);

  useEffect(() => {
    // Fetch-on-mount is exactly what effects are for.
    loadPlaces();
  }, [loadPlaces]);

  const places = loadState.status === 'ready' ? loadState.places : null;

  const filteredFeatures = useMemo(() => {
    if (!places) return [];
    return places.features.filter((feature) => {
      const matchesRegion = filters.region === 'ALL' || feature.properties.country === filters.region;
      const matchesCategory = filters.category === 'ALL' || feature.properties.category === filters.category;
      return matchesRegion && matchesCategory;
    });
  }, [places, filters]);

  const filteredCollection: PlaceCollection = useMemo(
    () => ({ type: 'FeatureCollection', features: filteredFeatures }),
    [filteredFeatures],
  );

  // Derived during render, not set via effect: an id that's no longer in
  // the filtered set is simply treated as unselected, rather than forcing
  // a second render just to null out the state that held it.
  const validSelectedId =
    selectedId !== null && filteredFeatures.some((feature) => feature.properties.id === selectedId)
      ? selectedId
      : null;

  const selectedFeature = useMemo(
    () => filteredFeatures.find((feature) => feature.properties.id === validSelectedId) ?? null,
    [filteredFeatures, validSelectedId],
  );

  const stats = useMemo(() => computeStats(filteredFeatures), [filteredFeatures]);

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

      {loadState.status === 'loading' && (
        <div className={styles.statusScreen}>
          <p>Carregando lugares...</p>
        </div>
      )}

      {loadState.status === 'error' && (
        <div className={styles.statusScreen}>
          <p>{loadState.message}</p>
          <button type="button" className={styles.retryButton} onClick={loadPlaces}>
            Tentar novamente
          </button>
        </div>
      )}

      {loadState.status === 'ready' && (
        <>
          <FilterBar filters={filters} onChange={setFilters} />
          <main className={`${styles.main} ${isMobile ? styles.mainStacked : ''}`}>
            <MapView data={filteredCollection} selectedId={validSelectedId} onSelect={setSelectedId} />
            <DetailsPanel place={selectedFeature} hasFilteredResults={filteredFeatures.length > 0} />
          </main>
          <MetricsStrip stats={stats} />
        </>
      )}
    </div>
  );
}

export default Dashboard;