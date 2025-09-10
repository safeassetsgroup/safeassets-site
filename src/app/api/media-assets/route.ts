import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// This recursive function will get all file paths in a directory.
async function getFiles(dir: string): Promise<string[]> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return Array.prototype.concat(...files);
}

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), "public");
    const allFiles = await getFiles(publicDir);

    // Create relative paths and filter for images and videos
    const relativeFiles = allFiles.map((file) => path.relative(publicDir, file).replace(/\\/g, '/'));

    const images = relativeFiles.filter((file) =>
      /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
    );
    const videos = relativeFiles.filter((file) =>
      /\.(mp4|webm|mov)$/i.test(file)
    );

    // Return the assets with the correct property names
    return NextResponse.json({ images, videos });
    
  } catch (err) {
    console.error("Failed to list media assets:", err);
    return NextResponse.json(
      { error: "Failed to list media assets" },
      { status: 500 }
    );
  }
}