import { NextRequest, NextResponse } from "next/server";

const SRCFUL_API_BASE = "https://mainnet.srcful.dev/price/electricity";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const zone = searchParams.get("zone");
    const date = searchParams.get("date");
    const days = searchParams.get("days") || "1";

    if (!zone) {
      return NextResponse.json(
        { error: "Missing required parameter: zone" },
        { status: 400 }
      );
    }

    // Validate zone format (e.g., "SE1", "NO2", "DK1", etc.)
    // Only allow alphanumeric characters to prevent URL injection
    if (!/^[A-Z]{2}[0-9]?$/.test(zone.toUpperCase())) {
      return NextResponse.json(
        { error: "Invalid zone format. Use format like SE1, NO2, DK1" },
        { status: 400 }
      );
    }

    if (!date) {
      return NextResponse.json(
        { error: "Missing required parameter: date" },
        { status: 400 }
      );
    }

    // Validate date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { error: "Invalid date format. Use YYYY-MM-DD" },
        { status: 400 }
      );
    }

    // Validate days (1-10)
    const daysNum = parseInt(days, 10);
    if (isNaN(daysNum) || daysNum < 1 || daysNum > 10) {
      return NextResponse.json(
        { error: "Days must be between 1 and 10" },
        { status: 400 }
      );
    }

    const apiUrl = `${SRCFUL_API_BASE}/${zone}?date=${date}&days=${days}`;

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
      },
      // Cache for 1 hour since electricity prices don't change once published
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: "No price data available for the specified zone and date" },
          { status: 404 }
        );
      }
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Electricity price API proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch electricity prices" },
      { status: 500 }
    );
  }
}
