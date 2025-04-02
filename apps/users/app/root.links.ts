import type { Route } from "./+types/root";

import styles from "@package/ui/styles/globals.css?url";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: styles, type: "text/css" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];
