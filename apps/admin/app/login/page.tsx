'use client';

import React, { useActionState } from 'react';
import { loginAction } from '../actions';
import styles from './page.module.css';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Notun Kuri High School</h1>
          <p className={styles.subtitle}>Administrative Console Sign In</p>
        </div>

        <form action={formAction} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={styles.input}
              placeholder="admin@school.edu.bd"
              defaultValue="admin@school.edu.bd"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className={styles.input}
              placeholder="••••••••"
              defaultValue="AdminPass123!"
            />
          </div>

          {state?.error && (
            <div className={styles.error} role="alert">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className={styles.button}
          >
            {isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  );
}
