import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const SEO_CONFIG_PATH = path.join(process.cwd(), "content/seo/metadata.json");

export async function GET() {
  try {
    const data = await fs.readFile(SEO_CONFIG_PATH, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error("Failed to read SEO config:", error);
    return NextResponse.json(
      { error: "Failed to load SEO configuration" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate the structure
    if (!data.defaults || !data.pages) {
      return NextResponse.json(
        { error: "Invalid SEO configuration structure" },
        { status: 400 }
      );
    }

    // Write the updated config
    await fs.writeFile(
      SEO_CONFIG_PATH,
      JSON.stringify(data, null, 2),
      "utf-8"
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save SEO config:", error);
    return NextResponse.json(
      { error: "Failed to save SEO configuration" },
      { status: 500 }
    );
  }
}
