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
import type { PlaceCollection } from '../../types/place';
import type { SelectedPlaceId } from '../../types/filters';
import {
  PLACES_LAYER_ID,
  PLACES_SOURCE_ID,
  CLUSTER_LAYER_ID,
  CLUSTER_COUNT_LAYER_ID,
  CLUSTER_RADIUS,
  CLUSTER_MAX_ZOOM,
  SATELLITE_STYLE,
  STREETS_STYLE_URL,
  type BasemapId,
} from './mapConstants';
import { CATEGORY_COLOR } from '../filters/categoryLabels';

// Without this, Vite serves maplibre-gl's worker at the wrong URL and tiles
// never get processed — the map style loads but nothing renders on top.
setWorkerUrl(workerUrl);

function selectionExpression<T extends number | string>(
  selectedId: SelectedPlaceId,
  whenSelected: T,
  otherwise: T,
): ['case', ['==', ['get', 'id'], string], T, T] {
  return ['case', ['==', ['get', 'id'], selectedId ?? ''], whenSelected, otherwise];
}

function colorExpression(selectedId: SelectedPlaceId) {
  // MapLibre's paint-property type is a deep union of hand-written tuples
  // that doesn't practically narrow for a dynamically-sized 7-branch match
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
      'entertainment',
      CATEGORY_COLOR.entertainment,
      CATEGORY_COLOR.landmark,
    ],
  ];
  return expression as unknown as ReturnType<typeof selectionExpression<string>>;
}

function ensurePlacesLayers(map: MapLibreMap, data: PlaceCollection, selectedId: SelectedPlaceId) {
  if (map.getSource(PLACES_SOURCE_ID)) {
    return;
  }

  map.addSource(PLACES_SOURCE_ID, {
    type: 'geojson',
    data,
    cluster: true,
    clusterRadius: CLUSTER_RADIUS,
    clusterMaxZoom: CLUSTER_MAX_ZOOM,
  });

  map.addLayer({
    id: CLUSTER_LAYER_ID,
    type: 'circle',
    source: PLACES_SOURCE_ID,
    filter: ['has', 'point_count'],
    paint: {
      'circle-radius': ['step', ['get', 'point_count'], 14, 25, 18, 100, 24],
      'circle-color': '#1a2740',
      'circle-stroke-width': 2,
      'circle-stroke-color': '#d4a24c',
    },
  });

  map.addLayer({
    id: CLUSTER_COUNT_LAYER_ID,
    type: 'symbol',
    source: PLACES_SOURCE_ID,
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-size': 12,
      'text-font': ['Noto Sans Regular'],
    },
    paint: {
      'text-color': '#e9eef6',
    },
  });

  map.addLayer({
    id: PLACES_LAYER_ID,
    type: 'circle',
    source: PLACES_SOURCE_ID,
    filter: ['!', ['has', 'point_count']],
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
  data: PlaceCollection;
  selectedId: SelectedPlaceId;
  onSelect: (id: SelectedPlaceId) => void;
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
      ensurePlacesLayers(map, dataRef.current, selectedIdRef.current);
    });

    map.on('click', PLACES_LAYER_ID, (event: MapLayerMouseEvent) => {
      const feature = event.features?.[0];
      const id = feature?.properties?.id;
      onSelectRef.current(typeof id === 'string' ? id : null);
    });

    map.on('click', CLUSTER_LAYER_ID, (event: MapLayerMouseEvent) => {
      const feature = event.features?.[0];
      const clusterId = feature?.properties?.cluster_id;
      const source = map.getSource(PLACES_SOURCE_ID);
      if (!feature || typeof clusterId !== 'number' || !(source instanceof GeoJSONSource)) {
        return;
      }
      const [lon, lat] = (feature.geometry as GeoJSON.Point).coordinates;
      source
        .getClusterExpansionZoom(clusterId)
        .then((zoom) => {
          map.easeTo({ center: [lon, lat], zoom });
        })
        .catch(() => {
          // Expansion zoom lookup can fail if the source data changed
          // (e.g. a filter applied) between the click and this callback.
          // Nothing to recover — the click is simply a no-op then.
        });
    });

    // Clicking empty map area clears selection; clicking a place or a
    // cluster (handled above) must not also trigger this.
    map.on('click', (event: MapMouseEvent) => {
      const hits = map.queryRenderedFeatures(event.point, {
        layers: [PLACES_LAYER_ID, CLUSTER_LAYER_ID],
      });
      if (hits.length === 0) {
        onSelectRef.current(null);
      }
    });

    for (const layerId of [PLACES_LAYER_ID, CLUSTER_LAYER_ID]) {
      map.on('mouseenter', layerId, () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', layerId, () => {
        map.getCanvas().style.cursor = '';
      });
    }

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // containerRef is stable across renders; data/selectedId are applied
    // by the effects below instead of recreating the map.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef]);

  // Keep the source in sync when the filtered dataset changes. Clusters
  // are recomputed by MapLibre automatically from whatever is in the
  // source, so a filtered setData() here is also how "clusters respect
  // the current filter" is satisfied — no separate cluster logic needed.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) {
      return;
    }
    const source = map.getSource(PLACES_SOURCE_ID);
    if (source instanceof GeoJSONSource) {
      source.setData(data);
    }
  }, [data]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getLayer(PLACES_LAYER_ID)) {
      return;
    }
    map.setPaintProperty(PLACES_LAYER_ID, 'circle-radius', selectionExpression(selectedId, 9, 6));
    map.setPaintProperty(PLACES_LAYER_ID, 'circle-color', colorExpression(selectedId));
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