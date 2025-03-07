import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = request.nextUrl.pathname

  // If it's the root path, redirect to /v0-retail-ecommerce
  // if (path === "/") {
  //   return NextResponse.redirect(new URL("/", request.url))
  // }

  return NextResponse.next()
}

