import Link from 'next/link';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps =
  | (ButtonBaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
  | (ButtonBaseProps & { href: string; target?: string; rel?: string });

export function Button({ variant = 'primary', size = 'md', loading, className, children, ...props }: ButtonProps) {
  const cls = [styles.button, styles[variant], styles[size], loading && styles.loading, className]
    .filter(Boolean)
    .join(' ');

  if ('href' in props && props.href) {
    const { href, target, rel, ...rest } = props as ButtonBaseProps & { href: string; target?: string; rel?: string };
    return (
      <Link href={href} target={target} rel={rel} className={cls} {...(rest as object)}>
        {children}
      </Link>
    );
  }

  const { href: _h, ...btnProps } = props as ButtonBaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
  return (
    <button className={cls} disabled={loading || btnProps.disabled} {...btnProps}>
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </button>
  );
}
