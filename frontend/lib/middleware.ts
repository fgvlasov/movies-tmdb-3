import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSession } from '@/actions/userActions';

// 1. Specify protected and public routes
const protectedRoutes = ['/users', '/favorites'];
const publicRoutes = ['/login', '/signup', '/'];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const session = await getSession();
  // const session = await decrypt(cookie)

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute) {
    if (session.isAdmin)
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    // !session?.userId ) {
  }

  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith('/users')
  ) {
    return NextResponse.redirect(new URL('/users', req.nextUrl));
  }

  // if (isProtectedRoute && !(await session).isAdmin) {
  //   return NextResponse.redirect(new URL('/login', req.nextUrl))
  // }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};