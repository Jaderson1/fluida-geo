import { useEffect, useRef, type RefObject } from 'react';
import {
  Map as MapLibreMap,
  NavigationControl,
  GeoJSONSource,
  type MapLayerMouseEvent,
  type MapMouseEvent,
} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { AttractionCollection } from '../../types/attraction';
import type { SelectedAttractionId } from '../../types/filters';
import { ATTRACTIONS_LAYER_ID, ATTRACTIONS_SOURCE_ID, BASEMAP_STYLE_URL } from './mapConstants';

function selectionExpression<T extends number | string>(
  selectedId: SelectedAttractionId,
  whenSelected: T,
  otherwise: T,
): ['case', ['==', ['get', 'id'], string], T, T] {
  return ['case', ['==', ['get', 'id'], selectedId ?? ''], whenSelected, otherwise];
}

interface UseMapLibreOptions {
  containerRef: RefObject<HTMLDivElement | null>;
  initialCenter: [number, number];
  initialZoom: number;
  data: AttractionCollection;
  selectedId: SelectedAttractionId;
  onSelect: (id: SelectedAttractionId) => void;
}

export function useMapLibre({
  containerRef,
  initialCenter,
  initialZoom,
  data,
  selectedId,
  onSelect,
}: UseMapLibreOptions) {
  const mapRef = useRef<MapLibreMap | null>(null);

  // Keeps the latest callback without recreating the MapLibre instance.
  const onSelectRef = useRef(onSelect);
  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const map = new MapLibreMap({
      container,
      style: BASEMAP_STYLE_URL,
      center: initialCenter,
      zoom: initialZoom,
    });
    map.addControl(new NavigationControl({ showCompass: false }), 'top-right');

    map.on('load', () => {
      map.addSource(ATTRACTIONS_SOURCE_ID, { type: 'geojson', data });

      map.addLayer({
        id: ATTRACTIONS_LAYER_ID,
        type: 'circle',
        source: ATTRACTIONS_SOURCE_ID,
        paint: {
          'circle-radius': selectionExpression(selectedId, 9, 6),
          'circle-color': selectionExpression(selectedId, '#56acb8', '#d4a24c'),
          'circle-stroke-width': 2,
          'circle-stroke-color': '#0a1220',
        },
      });

      map.on('click', ATTRACTIONS_LAYER_ID, (event: MapLayerMouseEvent) => {
        const feature = event.features?.[0];
        const id = feature?.properties?.id;
        onSelectRef.current(typeof id === 'string' ? id : null);
      });
      map.on('click', (event: MapMouseEvent) => {
        const hits = map.queryRenderedFeatures(event.point, { layers: [ATTRACTIONS_LAYER_ID] });
        if (hits.length === 0) {
          onSelectRef.current(null);
        }
      });
      map.on('mouseenter', ATTRACTIONS_LAYER_ID, () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', ATTRACTIONS_LAYER_ID, () => {
        map.getCanvas().style.cursor = '';
      });
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // containerRef is stable across renders; data/selectedId are applied
    // by the effects below instead of recreating the map.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) {
      return;
    }
    const source = map.getSource(ATTRACTIONS_SOURCE_ID);
    if (source instanceof GeoJSONSource) {
      source.setData(data);
    }
  }, [data]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getLayer(ATTRACTIONS_LAYER_ID)) {
      return;
    }
    map.setPaintProperty(ATTRACTIONS_LAYER_ID, 'circle-radius', selectionExpression(selectedId, 9, 6));
    map.setPaintProperty(
      ATTRACTIONS_LAYER_ID,
      'circle-color',
      selectionExpression(selectedId, '#56acb8', '#d4a24c'),
    );
  }, [selectedId]);

  return mapRef;
}