import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token.user.level !== 5) {
      return NextResponse.rewrite(new URL("/", req.url))
    }
    if (req.nextUrl.pathname.startsWith("/student") && req.nextauth.token.user.role !== "student") {
      return NextResponse.rewrite(new URL("/", req.url))
    }
    if (req.nextUrl.pathname.startsWith("/faculty") && (req.nextauth.token.user.role !== "faculty")) {
      return NextResponse.rewrite(new URL("/", req.url))
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