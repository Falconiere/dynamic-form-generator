import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'


const PRIVATE_URL = [
  "/forms",
  "/forms/preview",
]

const AUTH_URL = [
  "/login",
  "/signup"
]

const PUBLIC_URL = [
  "/forms/:id",
]

const matchPrivateUrlByRegex = (pathname: string) => {
  const regex = new RegExp(PRIVATE_URL.join('|'))
  return regex.test(pathname)
}

// Match public url by regex that use a UUID
const matchPublicUrlByRegex = (pathname: string) => {
  // Check if the pathname contains a UUID
  if (pathname.match(/\/forms\/[a-zA-Z0-9-]+/)) {
    return true
  }
  const regex = new RegExp(PUBLIC_URL.join('|'))
  return regex.test(pathname)
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()
  // if user is signed in and the current path is / redirect the user to /account
  const pathname = req.nextUrl.pathname
  if (user && AUTH_URL.includes(pathname)) {
    return NextResponse.redirect(new URL('/forms', req.url))
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && !matchPublicUrlByRegex(pathname) && !AUTH_URL.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  return res
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    "/forms", 
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

