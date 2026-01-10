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

    // Sanitize path to prevent path traversal attacks
    // Remove any potentially dangerous characters and patterns
    const sanitizedPath = pagePath
      .replace(/^\//, "") // Remove leading slash
      .replace(/\.\./g, "") // Remove directory traversal attempts
      .replace(/[<>:"|?*\x00-\x1f]/g, "") // Remove null bytes and other dangerous chars
      .replace(/\//g, "-") // Replace slashes with dashes
      .replace(/^-+|-+$/g, "") // Remove leading/trailing dashes
      .slice(0, 100) // Limit length
      || "home";

    // Validate the sanitized path only contains safe characters
    if (!/^[a-zA-Z0-9_-]+$/.test(sanitizedPath)) {
      return NextResponse.json(
        { error: "Invalid page path format" },
        { status: 400 }
      );
    }

    const extension = file.type.split("/")[1].replace("jpeg", "jpg");
    const filename = `${sanitizedPath}.${extension}`;

    // Ensure directory exists
    await mkdir(OG_IMAGES_DIR, { recursive: true });

    // Write file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(OG_IMAGES_DIR, filename);

    // Final safety check: ensure resolved path is within OG_IMAGES_DIR
    const resolvedPath = path.resolve(filePath);
    if (!resolvedPath.startsWith(path.resolve(OG_IMAGES_DIR))) {
      return NextResponse.json(
        { error: "Invalid file path" },
        { status: 400 }
      );
    }

    await writeFile(resolvedPath, buffer);

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
