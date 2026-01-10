import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { verifyAdminAuth } from "@/lib/admin-auth";

const OG_IMAGES_DIR = path.join(process.cwd(), "public/images/og");

export async function POST(request: NextRequest) {
  // Verify authentication
  const isAuthenticated = await verifyAdminAuth();
  if (!isAuthenticated) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const pagePath = formData.get("pagePath") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Use PNG, JPG, or WebP." },
        { status: 400 }
      );
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Max 2MB." },
        { status: 400 }
      );
    }

    // Generate filename from page path
    const sanitizedPath = pagePath
      .replace(/^\//, "") // Remove leading slash
      .replace(/\//g, "-") // Replace slashes with dashes
      || "home";

    const extension = file.type.split("/")[1].replace("jpeg", "jpg");
    const filename = `${sanitizedPath}.${extension}`;

    // Ensure directory exists
    await mkdir(OG_IMAGES_DIR, { recursive: true });

    // Write file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(OG_IMAGES_DIR, filename);

    await writeFile(filePath, buffer);

    const publicPath = `/images/og/${filename}`;

    return NextResponse.json({
      success: true,
      path: publicPath,
      filename
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
