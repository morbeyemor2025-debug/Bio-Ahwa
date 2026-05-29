import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("x-app", "bio-ahwa-care");
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/doctor/:path*", "/analytics/:path*"]
};
