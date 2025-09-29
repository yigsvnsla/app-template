import { Elysia } from "elysia";
import { logestic } from "../plugins/logestic-plugin";
import { auth } from "../utils/auth";
import { cors } from "../utils/cors";
import { middleware } from "../utils/middleware";
import { openapi } from "../utils/openapi";
import { organizationModule } from "./modules/organizations";

const app = new Elysia()
  .use(cors)
  .use(openapi)
  .use(middleware)
  .use(logestic)
  .use(organizationModule)
  .mount("/auth", auth.handler)
  .listen(Number.parseInt(process.env.AUTH_SERVER_PORT || "", 10));

console.log(`🦊 Elysia   is running at http://${app.server?.hostname}:${app.server?.port}`);
console.log(`📑 Swagger  is running at http://${app.server?.hostname}:${app.server?.port}/swagger`);
console.log(
  `📦 Logestic is running at http://${app.server?.hostname}:${app.server?.port}/logestic`,
);
