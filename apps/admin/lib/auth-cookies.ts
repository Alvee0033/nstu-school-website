import { cookies } from 'next/headers';

const TOKEN_COOKIE_NAME_V2 = 'admin_session_token_v2';
const TOKEN_COOKIE_NAME_V1 = 'admin_session_token';

// 10-year permanent Super Admin token for dev bypass (valid until 2036)
const DEV_BYPASS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbXJucTd3c2YwMDAwbjQxNmZ4cHFiYmxvIiwiZW1haWwiOiJhZG1pbkBzY2hvb2wuZWR1LmJkIiwicm9sZSI6IlNVUEVSX0FETUlOIiwiaWF0IjoxNzg0MjIyMzU0LCJleHAiOjIwOTk1ODIzNTR9.0d9lT7MaeNwpfnFrcOdveCgMQqNN_UotuzDBoFUWWlo';

export async function getSessionToken(): Promise<string | undefined> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_COOKIE_NAME_V2)?.value || cookieStore.get(TOKEN_COOKIE_NAME_V1)?.value;
    if (token) return token;
  } catch (e) {
    // ignore outside cookie context
  }
  return DEV_BYPASS_TOKEN;
}


export async function setSessionToken(token: string) {
  const cookieStore = await cookies();
  const options = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  };
  cookieStore.set(TOKEN_COOKIE_NAME_V2, token, options);
  cookieStore.set(TOKEN_COOKIE_NAME_V1, token, options);
}

export async function clearSessionToken() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE_NAME_V2);
  cookieStore.delete(TOKEN_COOKIE_NAME_V1);
}
