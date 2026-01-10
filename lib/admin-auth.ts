import { cookies } from "next/headers";
import crypto from "crypto";

const AUTH_COOKIE_NAME = "seo-admin-token";

// Token store - shared across module imports
// In production, use Redis or a database
export const validTokens = new Map<string, number>();

// Rate limiting store - tracks failed attempts by IP
// Key: IP address, Value: { count: number, resetAt: timestamp }
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_MAX_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const attempt = loginAttempts.get(ip);

  // Clean up expired entries
  if (attempt && attempt.resetAt < now) {
    loginAttempts.delete(ip);
    return { allowed: true };
  }

  if (!attempt) {
    return { allowed: true };
  }

  if (attempt.count >= RATE_LIMIT_MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfter: Math.ceil((attempt.resetAt - now) / 1000),
    };
  }

  return { allowed: true };
}

export function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const attempt = loginAttempts.get(ip);

  if (!attempt || attempt.resetAt < now) {
    loginAttempts.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
  } else {
    attempt.count++;
  }
}

export function clearRateLimit(ip: string): void {
  loginAttempts.delete(ip);
}

// Timing-safe password comparison to prevent timing attacks
export function verifyPassword(input: string, expected: string): boolean {
  if (!input || !expected) return false;

  // Ensure both strings are the same length for comparison
  const inputBuffer = Buffer.from(input);
  const expectedBuffer = Buffer.from(expected);

  // If lengths differ, still do comparison but return false
  // This prevents length-based timing attacks
  if (inputBuffer.length !== expectedBuffer.length) {
    crypto.timingSafeEqual(
      Buffer.alloc(expectedBuffer.length),
      expectedBuffer
    );
    return false;
  }

  return crypto.timingSafeEqual(inputBuffer, expectedBuffer);
}

export function invalidateToken(token: string): void {
  validTokens.delete(token);
}

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
