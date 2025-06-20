import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// No protected routes — all routes are publicly accessible
const clerk = clerkMiddleware(() => {
  return NextResponse.next();
});

export default clerk;

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};