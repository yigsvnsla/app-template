import type { App } from "@app/auth/src";
import { treaty } from "@elysiajs/eden";

export const authApiClient = treaty<App>("http://localhost:8888");
