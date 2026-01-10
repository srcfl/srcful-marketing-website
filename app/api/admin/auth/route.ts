import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { validTokens, AUTH_COOKIE_NAME } from "@/lib/admin-auth";

const ADMIN_PASSWORD = process.env.ADMIN_SEO_PASSWORD;
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

// Generate a secure token
function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!ADMIN_PASSWORD) {
      console.error("ADMIN_SEO_PASSWORD environment variable not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // Generate auth token
    const token = generateToken();
    const expiry = Date.now() + TOKEN_EXPIRY;
    validTokens.set(token, expiry);

    // Clean up expired tokens
    for (const [t, exp] of validTokens.entries()) {
      if (exp < Date.now()) {
        validTokens.delete(t);
      }
    }

    // Set HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  // Logout - clear the cookie
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  return NextResponse.json({ success: true });
}

export async function GET() {
  // Check if currently authenticated
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false });
  }

  const expiry = validTokens.get(token);
  if (!expiry || expiry < Date.now()) {
    validTokens.delete(token);
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({ authenticated: true });
}
