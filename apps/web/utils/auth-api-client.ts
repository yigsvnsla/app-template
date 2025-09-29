import { edenTreaty} from "@elysiajs/eden";

import type { App } from "@app/auth/src";


export const authApiClient = edenTreaty<App>("http://localhost:8888")


