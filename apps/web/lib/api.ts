const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api/v1';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message ?? 'Request failed');
  }

  const json = await res.json();
  return json.data as T;
}

export const api = {
  get: <T>(path: string, init?: RequestInit) =>
    apiFetch<T>(path, { ...init, method: 'GET', next: { revalidate: 60 } }),

  post: <T>(path: string, body: unknown, init?: RequestInit) =>
    apiFetch<T>(path, { ...init, method: 'POST', body: JSON.stringify(body) }),
};
