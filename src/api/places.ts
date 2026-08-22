import type { PlaceCollection } from '../types/place';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000';

export async function fetchPlaces(): Promise<PlaceCollection> {
  const response = await fetch(`${API_URL}/api/places`);
  if (!response.ok) {
    throw new Error(`GET /api/places failed with ${response.status}`);
  }
  return (await response.json()) as PlaceCollection;
}