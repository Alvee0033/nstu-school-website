import { getSessionToken } from './auth-cookies';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3005/api/v1';

async function apiRequest<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const token = await getSessionToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options?.headers,
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errorMsg = `HTTP Error: ${res.status}`;
    try {
      const errJson = await res.json();
      errorMsg = errJson.message || errorMsg;
    } catch {
      // ignore
    }
    throw new Error(errorMsg);
  }

  if (res.status === 204) {
    return {} as T;
  }

  return res.json();
}

export const api = {
  get: <T>(path: string, options?: RequestInit) =>
    apiRequest<T>(path, { ...options, method: 'GET', cache: 'no-store' }),

  post: <T>(path: string, body: unknown, options?: RequestInit) =>
    apiRequest<T>(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }),

  patch: <T>(path: string, body: unknown, options?: RequestInit) =>
    apiRequest<T>(path, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  delete: <T>(path: string, options?: RequestInit) =>
    apiRequest<T>(path, { ...options, method: 'DELETE' }),
};
