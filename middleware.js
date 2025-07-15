// middleware.js
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware({
  // Define public routes that do not require authentication.
  // Add any routes that should be accessible without a logged-in user.
  publicRoutes: [
    '/', // Example: your home page
    '/sign-in(.*)', // Allow access to sign-in page
    '/sign-up(.*)', // Allow access to sign-up page
    '/api/gemini', // IMPORTANT: If your /api/gemini route should be publicly accessible, add it here.
                   // If it requires authentication, DO NOT add it here.
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
