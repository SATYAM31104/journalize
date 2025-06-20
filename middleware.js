import { NextResponse } from 'next/server';

// Remove all Clerk logic — allow everyone
export function middleware(req) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply to all routes except static files and Next.js internals
    '/((?!_next|.*\\.(?:png|jpg|jpeg|svg|css|js|ico|woff2?)$).*)',
  ],
};