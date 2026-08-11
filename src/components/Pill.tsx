import type { ButtonHTMLAttributes } from 'react';
import styles from './Pill.module.css';

interface PillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  /** Optional small color dot, e.g. a country color. */
  accent?: string;
}

/** A small toggle-style button. Generic — used for both region and category filters. */
function Pill({ isActive, accent, className, children, ...rest }: PillProps) {
  return (
    <button
      type="button"
      className={[styles.pill, isActive ? styles.active : '', className]
        .filter(Boolean)
        .join(' ')}
      aria-pressed={isActive}
      {...rest}
    >
      {accent ? (
        <span className={styles.dot} style={{ backgroundColor: accent }} aria-hidden="true" />
      ) : null}
      {children}
    </button>
  );
}

export default Pill;
