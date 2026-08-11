import Pill from '../../components/Pill';
import type { FilterState } from '../../types/filters';
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  COUNTRY_ACCENT,
  COUNTRY_ORDER,
} from './categoryLabels';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  filters: FilterState;
  onChange: (next: FilterState) => void;
}

/**
 * Region + category filters. Deliberately flat state, not a form library —
 * two independent single-select groups, nothing more complex than that yet.
 */
function FilterBar({ filters, onChange }: FilterBarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.group} role="group" aria-label="Filtrar por região">
        <Pill isActive={filters.region === 'ALL'} onClick={() => onChange({ ...filters, region: 'ALL' })}>
          Todas
        </Pill>
        {COUNTRY_ORDER.map((country) => (
          <Pill
            key={country}
            isActive={filters.region === country}
            accent={COUNTRY_ACCENT[country]}
            onClick={() => onChange({ ...filters, region: country })}
          >
            {country}
          </Pill>
        ))}
      </div>

      <div className={styles.group} role="group" aria-label="Filtrar por categoria">
        <Pill
          isActive={filters.category === 'ALL'}
          onClick={() => onChange({ ...filters, category: 'ALL' })}
        >
          Todas categorias
        </Pill>
        {CATEGORY_ORDER.map((category) => (
          <Pill
            key={category}
            isActive={filters.category === category}
            onClick={() => onChange({ ...filters, category })}
          >
            {CATEGORY_LABELS[category]}
          </Pill>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;
