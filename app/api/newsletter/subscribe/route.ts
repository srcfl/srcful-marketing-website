import { NextRequest, NextResponse } from "next/server";

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

// Extract datacenter from API key (e.g., "us14" from "xxx-us14")
const MAILCHIMP_DC = MAILCHIMP_API_KEY?.split("-").pop();

// Rate limiting for newsletter subscriptions
const subscriptionAttempts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

function checkSubscriptionRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const attempt = subscriptionAttempts.get(ip);

  if (attempt && attempt.resetAt < now) {
    subscriptionAttempts.delete(ip);
    return { allowed: true };
  }

  if (!attempt) {
    subscriptionAttempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (attempt.count >= RATE_LIMIT_MAX) {
    return { allowed: false, retryAfter: Math.ceil((attempt.resetAt - now) / 1000) };
  }

  attempt.count++;
  return { allowed: true };
}

// RFC 5322 compliant email validation (simplified but more robust)
function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  if (email.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  // Rate limit check
  const clientIP = getClientIP(request);
  const rateLimit = checkSubscriptionRateLimit(clientIP);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: `Too many subscription attempts. Try again later.` },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } }
    );
  }

  try {
    const { email } = await request.json();

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID || !MAILCHIMP_DC) {
      console.error("Mailchimp credentials not configured");
      return NextResponse.json(
        { error: "Newsletter service not configured" },
        { status: 500 }
      );
    }

    const url = `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ success: true });
    }

    // Handle "already subscribed" as success
    if (data.title === "Member Exists") {
      return NextResponse.json({ success: true, alreadySubscribed: true });
    }

    // Handle other errors
    console.error("Mailchimp error:", data);
    return NextResponse.json(
      { error: data.detail || "Failed to subscribe" },
      { status: response.status }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
