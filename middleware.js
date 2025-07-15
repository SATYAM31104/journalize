// middleware.js
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware({
  // Define public routes that do not require authentication.
  // Add any routes that should be accessible without a logged-in user.
  publicRoutes: [
    '/', // This makes your root/home page accessible without login.
    '/sign-in(.*)', // Keep this to allow users to reach the sign-in page.
    '/sign-up(.*)', // Keep this to allow users to reach the sign-up page.
    '/api/gemini', // If your bot should be usable by unauthenticated users, keep this public.
    // Add any other pages you want to be publicly accessible, e.g., '/about', '/contact', etc.
    // For example, if you have an /about page: '/about',
  ],
  // You can also add ignoredRoutes if you have specific paths Clerk should completely ignore.
  // ignoredRoutes: ['/((?!api|trpc|_next/static|_next/image|favicon.ico).*)'],
});

export const config = {
  // Matcher for all routes except static files and Next.js internal routes.
  // This configuration ensures the middleware runs for all relevant paths,
  // including API routes, allowing Clerk to provide authentication context.
  matcher: [
    // Match all routes that are not static files or Next.js internal paths.
    // This includes pages and API routes.
    '/((?!.+\\.[\\w]+$|_next).*)',
    // Optionally, explicitly include API routes if the above doesn't cover them sufficiently.
    // '/(api|trpc)(.*)',
  ],
};
