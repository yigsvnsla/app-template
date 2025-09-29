import type { App } from "@app/auth/src";
import { edenTreaty } from "@elysiajs/eden";

export const authApiClient = edenTreaty<App>("http://localhost:8888");
