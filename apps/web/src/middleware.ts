import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip public routes and static assets
  if (
    pathname === '/' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('/login')
  ) {
    return NextResponse.next();
  }

  // Get the demo role from cookies (this would be a real JWT in production)
  const roleCookie = request.cookies.get('medonivo_demo_role')?.value;

  // Protect /doctor routes
  if (pathname.startsWith('/doctor')) {
    if (roleCookie !== 'doctor') {
      return NextResponse.redirect(new URL('/doctor/login', request.url));
    }
    return NextResponse.next();
  }

  // Protect /patient routes
  if (pathname.startsWith('/patient')) {
    if (roleCookie !== 'patient') {
      // In a real app, redirect to patient login. For now, redirect to home.
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Protect /medical routes
  if (pathname.startsWith('/medical')) {
    if (roleCookie !== 'medical' && roleCookie !== 'admin') {
      // In a real app, redirect to admin login. For now, redirect to home.
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
