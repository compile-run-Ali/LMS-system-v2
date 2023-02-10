import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token.user.role !== "admin") {
      return NextResponse.rewrite(new URL("/pages/index.js", req.url))
    }
    if (req.nextUrl.pathname.startsWith("/student") && req.nextauth.token.user.role !== "student") {
      return NextResponse.rewrite(new URL("/pages/index.js", req.url))
    }
    if (req.nextUrl.pathname.startsWith("/faculty") && req.nextauth.token.user.role !== "faculty") {
      return NextResponse.rewrite(new URL("/pages/index.js", req.url))
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
}