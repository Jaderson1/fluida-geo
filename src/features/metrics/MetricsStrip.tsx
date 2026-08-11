import { FluidaGrid } from '@fluida/react';
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

/**
 * Every number here comes from computeStats(filteredFeatures) — nothing
 * hardcoded — so this strip stays correct as filters change, and needs no
 * changes at all once real data replaces the local dataset.
 *
 * Uses FluidaGrid (viewport-token-driven column count) rather than
 * FluidaAdaptiveGrid: four short, equal-weight numbers is exactly the
 * "N similar items" case FluidaGrid targets, and it doesn't need
 * FluidaAdaptiveGrid's own-container ResizeObserver measurement — the
 * viewport is a fine enough signal for how many of these small cards fit
 * in a row.
 */
function MetricsStrip({ stats }: MetricsStripProps) {
  return (
    <footer className={styles.strip} aria-label="Indicadores do conjunto atual de atrações">
      <FluidaGrid className={styles.grid}>
        {INDICATORS.map(({ key, label }) => (
          <div key={key} className={styles.item}>
            <span className={styles.value}>{stats[key]}</span>
            <span className={styles.label}>{label}</span>
          </div>
        ))}
      </FluidaGrid>
    </footer>
  );
}

export default MetricsStrip;
