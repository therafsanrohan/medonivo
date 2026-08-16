import { type NextRequest } from 'next/server'
import { updateSession } from './utils/supabase/middleware'
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // Guard: if Supabase env vars are not configured (e.g. Vercel preview without env),
  // skip auth check to prevent FUNCTION_INVOCATION_FAILED crashes.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // Can't authenticate — allow request through so the app doesn't hard-crash
    return NextResponse.next();
  }

  // Update the user session (refresh tokens if necessary)
  const response = await updateSession(request)

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {},
        remove(name: string, options: any) {},
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect all routes except /login
  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
  
  if (user && request.nextUrl.pathname.startsWith('/login')) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
