/*import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin") {
      return NextResponse.rewrite(new URL("/auth/login", req.url))
    }
    if (req.nextUrl.pathname.startsWith("/student") && req.nextauth.token?.role !== "student") {
      return NextResponse.rewrite(new URL("/auth/login", req.url))
    }
    if (req.nextUrl.pathname.startsWith("/faculty") && req.nextauth.token?.role !== "faculty") {
      return NextResponse.rewrite(new URL("/auth/login", req.url))
    }
  },
  {
    callbacks: {
      authorized:({token})=> !!token
    }
  }
)

export const config = {
  matcher: ["/admin/:path*", "/student/:path*", "/faculty/:path*"]
}*/