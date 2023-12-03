import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Auth } from '@/lib/database.types'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient<Auth>({ cookies: () => cookieStore })

  await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  })
}