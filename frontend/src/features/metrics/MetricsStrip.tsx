import type { AttractionStats } from './computeStats';
import styles from './MetricsStrip.module.css';

interface MetricsStripProps {
  stats: AttractionStats;
}

const INDICATORS: Array<{ key: keyof AttractionStats; label: string }> = [
  { key: 'attractions', label: 'Atrações' },
  { key: 'cities', label: 'Cidades' },
  { key: 'countries', label: 'Países' },
  { key: 'categories', label: 'Categorias' },
];

// Plain flex row, not FluidaGrid: FluidaGrid's columns are minmax(0, 1fr)
// with no width cap, so on this strip's full-width container each card
// stretched edge to edge. These four need a fixed compact width instead.
function MetricsStrip({ stats }: MetricsStripProps) {
  return (
    <footer className={styles.strip} aria-label="Indicadores do conjunto atual de atrações">
      <div className={styles.grid}>
        {INDICATORS.map(({ key, label }) => (
          <div key={key} className={styles.item}>
            <span className={styles.value}>{stats[key]}</span>
            <span className={styles.label}>{label}</span>
          </div>
        ))}
      </div>
    </footer>
  );
}

export default MetricsStrip;
