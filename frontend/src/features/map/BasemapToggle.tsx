import type { BasemapId } from './mapConstants';
import styles from './BasemapToggle.module.css';

interface BasemapToggleProps {
  value: BasemapId;
  onChange: (next: BasemapId) => void;
}

function BasemapToggle({ value, onChange }: BasemapToggleProps) {
  return (
    <div className={styles.toggle} role="group" aria-label="Estilo do mapa">
      <button
        type="button"
        className={value === 'streets' ? styles.active : undefined}
        onClick={() => onChange('streets')}
      >
        Mapa
      </button>
      <button
        type="button"
        className={value === 'satellite' ? styles.active : undefined}
        onClick={() => onChange('satellite')}
      >
        Satélite
      </button>
    </div>
  );
}

export default BasemapToggle;
