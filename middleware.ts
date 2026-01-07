import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match internationalized pathnames only
  // Exclude: api, _next, static files, and non-localized sections (docs, components, brand, changelog, roadmap)
  matcher: [
    // Match all pathnames except for
    // - API routes (/api/*)
    // - Next.js internals (/_next/*)
    // - Static files (*.*)
    // - Non-localized sections
    "/((?!api|_next|_vercel|.*\\..*|docs|components|brand|changelog|roadmap).*)",
    // Always run for root
    "/",
  ],
};
