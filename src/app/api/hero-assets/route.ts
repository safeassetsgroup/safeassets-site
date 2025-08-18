import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dir = path.join(process.cwd(), "public", "hero");
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });
    const files = entries
      .filter((d) => d.isFile())
      .map((d) => d.name)
      .sort(); // deterministic order

    const mp4 = files.find((f) => /\.mp4$/i.test(f)) ?? null;
    const png = files.find((f) => /\.png$/i.test(f)) ?? null;
    const jpg = files.find((f) => /\.(jpe?g)$/i.test(f)) ?? null;

    // Priority: first MP4, else first PNG, else first JPG
    const video = mp4 ? `/hero/${encodeURI(mp4)}` : null;
    const image = !video ? (png ? `/hero/${encodeURI(png)}` : (jpg ? `/hero/${encodeURI(jpg)}` : null)) : null;

    return NextResponse.json({ video, image });
  } catch (err) {
    return NextResponse.json({ video: null, image: null });
  }
}