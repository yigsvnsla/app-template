import { app } from "@app/auth/src"
import { logestic } from "@app/auth/plugins/logestic-plugin";

app.use(logestic).listen(Number.parseInt(process.env.AUTH_SERVER_PORT || "", 10));

console.log(`🦊 Elysia   is running at http://${app.server?.hostname}:${app.server?.port}`);
console.log(`📑 Swagger  is running at http://${app.server?.hostname}:${app.server?.port}/swagger`);
console.log(
  `📦 Logestic is running at http://${app.server?.hostname}:${app.server?.port}/logestic`,
);
