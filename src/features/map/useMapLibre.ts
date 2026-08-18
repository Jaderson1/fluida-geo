import { useEffect, useRef, useState, type RefObject } from 'react';
import {
  Map as MapLibreMap,
  NavigationControl,
  GeoJSONSource,
  setWorkerUrl,
  type MapLayerMouseEvent,
  type MapMouseEvent,
} from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { AttractionCollection } from '../../types/attraction';
import type { SelectedAttractionId } from '../../types/filters';
import {
  ATTRACTIONS_LAYER_ID,
  ATTRACTIONS_SOURCE_ID,
  SATELLITE_STYLE,
  STREETS_STYLE_URL,
  type BasemapId,
} from './mapConstants';
import { CATEGORY_COLOR } from '../filters/categoryLabels';

// One color per category, layered under the selection highlight below.
// Written as a literal tuple (not built from Object.entries) so it matches
// MapLibre's strict expression typing instead of a loosely-typed array.
function colorExpression(selectedId: SelectedAttractionId) {
  // MapLibre's paint-property type is a deep union of hand-written tuples
  // that doesn't practically narrow for a dynamically-sized 6-branch match
  // expression built from CATEGORY_COLOR. The bridge-through-unknown cast
  // below is a known, deliberate gap in the type, not a hidden one — the
  // runtime shape is a standard "case"/"match" expression MapLibre accepts.
  const expression = [
    'case',
    ['==', ['get', 'id'], selectedId ?? ''],
    '#56acb8',
    [
      'match',
      ['get', 'category'],
      'nature',
      CATEGORY_COLOR.nature,
      'culture',
      CATEGORY_COLOR.culture,
      'gastronomy',
      CATEGORY_COLOR.gastronomy,
      'shopping',
      CATEGORY_COLOR.shopping,
      'landmark',
      CATEGORY_COLOR.landmark,
      'hotel',
      CATEGORY_COLOR.hotel,
      CATEGORY_COLOR.landmark,
    ],
  ];
  return expression as unknown as ReturnType<typeof selectionExpression<string>>;
}

// Without this, Vite serves maplibre-gl's worker at the wrong URL and tiles
// never get processed — the map style loads but nothing renders on top.
setWorkerUrl(workerUrl);

function selectionExpression<T extends number | string>(
  selectedId: SelectedAttractionId,
  whenSelected: T,
  otherwise: T,
): ['case', ['==', ['get', 'id'], string], T, T] {
  return ['case', ['==', ['get', 'id'], selectedId ?? ''], whenSelected, otherwise];
}

function ensureAttractionsLayer(
  map: MapLibreMap,
  data: AttractionCollection,
  selectedId: SelectedAttractionId,
) {
  if (map.getSource(ATTRACTIONS_SOURCE_ID)) {
    return;
  }
  map.addSource(ATTRACTIONS_SOURCE_ID, { type: 'geojson', data });
  map.addLayer({
    id: ATTRACTIONS_LAYER_ID,
    type: 'circle',
    source: ATTRACTIONS_SOURCE_ID,
    paint: {
      'circle-radius': selectionExpression(selectedId, 9, 6),
      'circle-color': colorExpression(selectedId),
      'circle-stroke-width': 2,
      'circle-stroke-color': '#0a1220',
    },
  });
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
  const [basemap, setBasemapState] = useState<BasemapId>('streets');

  // Keeps the latest callback without recreating the MapLibre instance.
  const onSelectRef = useRef(onSelect);
  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  // Same reasoning as onSelectRef: read by the style.load handler below,
  // which is registered once and would otherwise see stale values after a
  // basemap switch.
  const dataRef = useRef(data);
  useEffect(() => {
    dataRef.current = data;
  }, [data]);
  const selectedIdRef = useRef(selectedId);
  useEffect(() => {
    selectedIdRef.current = selectedId;
  }, [selectedId]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const map = new MapLibreMap({
      container,
      style: STREETS_STYLE_URL,
      center: initialCenter,
      zoom: initialZoom,
    });
    map.addControl(new NavigationControl({ showCompass: false }), 'top-right');

    // setStyle() (basemap switch) drops custom sources/layers; style.load
    // fires after the initial load and after every setStyle, so this one
    // handler covers both cases.
    map.on('style.load', () => {
      ensureAttractionsLayer(map, dataRef.current, selectedIdRef.current);
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
    map.setPaintProperty(ATTRACTIONS_LAYER_ID, 'circle-color', colorExpression(selectedId));
  }, [selectedId]);

  const setBasemap = (next: BasemapId) => {
    const map = mapRef.current;
    if (!map || next === basemap) {
      return;
    }
    setBasemapState(next);
    map.setStyle(next === 'streets' ? STREETS_STYLE_URL : SATELLITE_STYLE);
  };

  return { mapRef, basemap, setBasemap };
}