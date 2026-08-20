import { useEffect, useRef } from 'react';
import { useFluidaContainerSize } from '@fluida/react';
import type { PlaceCollection } from '../../types/place';
import type { SelectedPlaceId } from '../../types/filters';
import { useMapLibre } from './useMapLibre';
import { INITIAL_ZOOM } from './mapConstants';
import { REGION_CENTER } from '../../data/places';
import BasemapToggle from './BasemapToggle';
import CategoryLegend from './CategoryLegend';
import ResetViewButton from './ResetViewButton';
import styles from './MapView.module.css';

interface MapViewProps {
  data: PlaceCollection;
  selectedId: SelectedPlaceId;
  onSelect: (id: SelectedPlaceId) => void;
}

function MapView({ data, selectedId, onSelect }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { mapRef, basemap, setBasemap, resetView } = useMapLibre({
    containerRef,
    initialCenter: REGION_CENTER,
    initialZoom: INITIAL_ZOOM,
    data,
    selectedId,
    onSelect,
  });
  const { width, height } = useFluidaContainerSize(containerRef);

  // MapLibre already observes its own container, but this ties the
  // repaint explicitly to Fluida's own measurement of this element.
  useEffect(() => {
    if (width === 0 || height === 0) {
      return;
    }
    mapRef.current?.resize();
  }, [width, height, mapRef]);

  return (
    <div ref={containerRef} className={styles.mapContainer} aria-label="Mapa da região trinacional">
      <CategoryLegend />
      <ResetViewButton onClick={resetView} />
      <BasemapToggle value={basemap} onChange={setBasemap} />
    </div>
  );
}

export default MapView;