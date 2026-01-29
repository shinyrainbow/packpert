import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized paths, exclude /api, /dashboard, /login, /_next, and static files
  matcher: [
    "/((?!api|dashboard|login|_next|.*\\..*).*)",
  ],
};
