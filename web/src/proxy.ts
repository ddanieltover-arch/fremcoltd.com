import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

async function readAdminToken(request: NextRequest) {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;

  const secure =
    request.nextUrl.protocol === "https:" ||
    request.headers.get("x-forwarded-proto") === "https";

  // Auth.js v5 cookie names differ from legacy next-auth defaults used by getToken().
  const cookieNames = secure
    ? ["__Secure-authjs.session-token", "__Secure-next-auth.session-token"]
    : ["authjs.session-token", "next-auth.session-token"];

  for (const cookieName of cookieNames) {
    try {
      const token = await getToken({
        req: request,
        secret,
        secureCookie: secure,
        cookieName,
      });
      if (token) return token;
    } catch (error) {
      console.error("[proxy] getToken failed", cookieName, error);
    }
  }

  return null;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";
  const token = await readAdminToken(request);

  if (isLogin) {
    if (token) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL("/admin/login", request.url);
    const callback = `${pathname}${request.nextUrl.search}`;
    if (callback.startsWith("/admin") && !callback.startsWith("//")) {
      loginUrl.searchParams.set("callbackUrl", callback);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
