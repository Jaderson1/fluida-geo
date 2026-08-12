import { useEffect, useRef } from 'react';
import { useFluidaContainerSize } from '@fluida/react';
import type { AttractionCollection } from '../../types/attraction';
import type { SelectedAttractionId } from '../../types/filters';
import { useMapLibre } from './useMapLibre';
import { INITIAL_ZOOM } from './mapConstants';
import { REGION_CENTER } from '../../data/attractions';
import BasemapToggle from './BasemapToggle';
import styles from './MapView.module.css';

interface MapViewProps {
  data: AttractionCollection;
  selectedId: SelectedAttractionId;
  onSelect: (id: SelectedAttractionId) => void;
}

function MapView({ data, selectedId, onSelect }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { mapRef, basemap, setBasemap } = useMapLibre({
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
      <BasemapToggle value={basemap} onChange={setBasemap} />
    </div>
  );
}

export default MapView;
