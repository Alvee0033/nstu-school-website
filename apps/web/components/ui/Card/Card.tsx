import styles from './Card.module.css';

interface CardProps {
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Card({ interactive, className, children }: CardProps) {
  return (
    <div className={[styles.card, interactive && styles.interactive, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}
