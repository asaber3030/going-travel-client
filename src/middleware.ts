import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  /* if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const user = await getAdmin();
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } */
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
