import { Elysia } from "elysia";
import { auth } from "@app/auth/utils/auth";
import { cors } from "@app/auth/utils/cors";
import { middleware } from "@app/auth/utils/middleware";
import { openapi } from "@app/auth/utils/openapi";
import { organizationModule } from "@app/auth/src/modules/organizations";

export const app = new Elysia()
  .use(cors)
  .use(openapi)
  .use(middleware)
  .use(organizationModule)
  .mount("/auth", auth.handler)


export type App = typeof app;