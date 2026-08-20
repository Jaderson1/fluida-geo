import { CATEGORY_COLOR, CATEGORY_LABELS, CATEGORY_ORDER } from '../filters/categoryLabels';
import styles from './CategoryLegend.module.css';

function CategoryLegend() {
  return (
    <ul className={styles.legend} aria-label="Legenda de categorias">
      {CATEGORY_ORDER.map((category) => (
        <li key={category} className={styles.item}>
          <span className={styles.dot} style={{ backgroundColor: CATEGORY_COLOR[category] }} aria-hidden="true" />
          {CATEGORY_LABELS[category]}
        </li>
      ))}
    </ul>
  );
}

export default CategoryLegend;