// middleware.js
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    /*
      Match all paths except:
      - static files (/_next/)
      - API routes (/api/)
      - public assets
    */
    "/((?!_next|api|favicon.ico|.*\\..*).*)",
  ],
};