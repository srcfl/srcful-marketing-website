import { cookies } from "next/headers";

const AUTH_COOKIE_NAME = "seo-admin-token";

// Token store - shared across module imports
// In production, use Redis or a database
export const validTokens = new Map<string, number>();

export async function verifyAdminAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return false;
  }

  const expiry = validTokens.get(token);
  if (!expiry || expiry < Date.now()) {
    validTokens.delete(token);
    return false;
  }

  return true;
}

export { AUTH_COOKIE_NAME };
