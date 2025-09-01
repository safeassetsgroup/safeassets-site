// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1) Only enforce in Production
  const env = process.env.VERCEL_ENV || process.env.NODE_ENV;
  if (env !== "production") return NextResponse.next();

  // 2) Allow internals & public assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.[a-z0-9]+$/i.test(pathname) // any file extension
  ) {
    return NextResponse.next();
  }

  // 3) Optional: allow all API routes without auth
  if (pathname.startsWith("/api/")) return NextResponse.next();

  // 4) Basic auth: set BASIC_AUTH="username:password"
  const BASIC = process.env.BASIC_AUTH;
  if (!BASIC) return NextResponse.next(); // if not configured, do nothing

  const header = req.headers.get("authorization") || "";
  if (header.startsWith("Basic ")) {
    const b64 = header.slice(6);
    const decoded =
      typeof atob === "function" ? atob(b64) : Buffer.from(b64, "base64").toString("utf8");
    if (decoded === BASIC) return NextResponse.next();
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="SafeAssets Preview"' },
  });
}

// Apply to everything except the listed assets/files above
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
