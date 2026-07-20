import styles from './Badge.module.css';

type Variant = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

interface BadgeProps {
  label: string;
  variant?: Variant;
}

export function Badge({ label, variant = 'neutral' }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[variant]}`}>{label}</span>;
}
