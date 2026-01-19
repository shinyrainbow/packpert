import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all paths except /api, /dashboard, /login, /_next, and static files
  matcher: [
    "/",
    "/(th|en)/:path((?!dashboard|login|api|_next|.*\\..*).*)*",
  ],
};
