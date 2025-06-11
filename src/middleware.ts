import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AUTH_COOKIE_NAME = 'token'

const PUBLIC_PATHS = ['/auth']

const PROTECTED_PATHS = ['/dashboard']

const isMatchingPath = (pathname: string, paths: string[]) =>
  paths.some((path) => pathname.startsWith(path))

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value

  if (isMatchingPath(pathname, PROTECTED_PATHS) && !token) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  if (isMatchingPath(pathname, PUBLIC_PATHS) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard', '/auth'],
}
