import styles from './ResetViewButton.module.css';

interface ResetViewButtonProps {
  onClick: () => void;
}

function ResetViewButton({ onClick }: ResetViewButtonProps) {
  return (
    <button type="button" className={styles.button} onClick={onClick} aria-label="Voltar à visão da Tríplice Fronteira">
      Tríplice Fronteira
    </button>
  );
}

export default ResetViewButton;