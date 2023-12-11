import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'


const PRIVATE_URL = [
  "/",
  '/forms',
]

const AUTH_URL = [
  '/login',
  '/signup'
]

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
  if (!user && PRIVATE_URL.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  return res
}

