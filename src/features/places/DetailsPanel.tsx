import type { PlaceFeature } from '../../types/place';
import { CATEGORY_LABELS, COUNTRY_ACCENT, COUNTRY_LABELS } from '../filters/categoryLabels';
import styles from './DetailsPanel.module.css';

interface DetailsPanelProps {
  place: PlaceFeature | null;
}

// Single panel for every category (attraction, hotel, restaurant, ...) —
// deliberately not split per category, since properties are already the
// same shape for all of them.
function DetailsPanel({ place }: DetailsPanelProps) {
  if (!place) {
    return (
      <aside className={styles.panel} aria-label="Detalhes do local">
        <p className={styles.empty}>Selecione um ponto no mapa para ver detalhes aqui.</p>
      </aside>
    );
  }

  const { name, city, country, category, description } = place.properties;
  const [lon, lat] = place.geometry.coordinates;

  return (
    <aside className={styles.panel} aria-label="Detalhes do local">
      <span className={styles.badge} style={{ borderColor: COUNTRY_ACCENT[country] }}>
        {COUNTRY_LABELS[country]}
      </span>
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.meta}>
        {city} · {CATEGORY_LABELS[category]}
      </p>
      <p className={styles.description}>{description}</p>
      <p className={styles.coords}>
        {Math.abs(lat).toFixed(4)}°{lat < 0 ? 'S' : 'N'}, {Math.abs(lon).toFixed(4)}°
        {lon < 0 ? 'W' : 'E'}
      </p>
    </aside>
  );
}

export default DetailsPanel;