import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";

// Middleware function to handle requests
export async function middleware(request: NextRequest) {
  // Check if the user is authenticated
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // If the user is authenticated and trying to access sign-in or sign-up pages, redirect to dashboard
  if (token && (url.pathname === "/sign-in" || url.pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If the user is not authenticated and trying to access protected routes, redirect to sign-in
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Specify the paths where the middleware should be applied
export const config = {
  matcher: ["/sign-in", "/sign-up", "/dashboard/:path*", "/verify/:path*"], // Apply middleware to all specified routes
};
