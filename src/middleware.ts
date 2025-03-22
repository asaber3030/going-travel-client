import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUser } from "./actions/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exclude the login page from authentication check
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const user = await getUser();
    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
