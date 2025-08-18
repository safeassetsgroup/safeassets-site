import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const dirParam = url.searchParams.get("dir") || "";
    const safeDir = dirParam.replace(/^\/+/, "").replace(/\.\.+/g, "");
    const dir = path.join(process.cwd(), "public", safeDir);

    const entries = await fs.promises.readdir(dir, { withFileTypes: true });
    const files = entries.filter(e => e.isFile()).map(e => e.name);

    const mp4 = files.find(f => /\.mp4$/i.test(f)) ?? null;
    const png = files.find(f => /\.png$/i.test(f)) ?? null;
    const jpg = files.find(f => /\.(jpe?g)$/i.test(f)) ?? null;

    const video = mp4 ? `/${safeDir}/${encodeURI(mp4)}`.replace(/\/+/g, "/") : null;
    const image = !video ? (png ? `/${safeDir}/${encodeURI(png)}`.replace(/\/+/g, "/") : (jpg ? `/${safeDir}/${encodeURI(jpg)}`.replace(/\/+/g, "/") : null)) : null;

    return NextResponse.json({ video, image });
  } catch (err) {
    return NextResponse.json({ video: null, image: null });
  }
}