import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow Next internals, static assets and any explicitly public API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/public") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/api/public")
  ) {
    return NextResponse.next();
  }

  // If no BASIC_AUTH configured, allow access (useful for local dev if not set)
  const basicCreds = process.env.BASIC_AUTH; // expected "username:password"
  if (!basicCreds) return NextResponse.next();

  const auth = req.headers.get("authorization");
  if (auth && auth.startsWith("Basic ")) {
    const b64 = auth.split(" ")[1];
    let decoded = "";
    try {
      // Edge runtime supports atob; fallback to Buffer if available
      decoded =
        typeof atob === "function"
          ? atob(b64)
          : Buffer.from(b64, "base64").toString("utf8");
    } catch {
      decoded = "";
    }
    if (decoded === basicCreds) return NextResponse.next();
  }

  // Trigger browser login dialog
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="SafeAssets Preview"' },
  });
}

export const config = {
  // run middleware for all paths (we early-return for allowed paths above)
  matcher: ["/:path*"],
};