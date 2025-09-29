import { Elysia } from 'elysia';
import { cors } from '../utils/cors';
import { auth } from '../utils/auth';
import { openapi } from '../utils/openapi';
import { middleware } from '../utils/middleware';
import { logestic } from '../plugins/logestic-plugin';

const app = new Elysia()
  .use(cors)
  .use(openapi)
  .use(middleware)
  .use(logestic)
  .mount("/auth", auth.handler)
  .listen(Number.parseInt(process.env.AUTH_SERVER_PORT || ''));


console.log(
  `🦊 Elysia   is running at http://${app.server?.hostname}:${app.server?.port}`
);
console.log(
  `📑 Swagger  is running at http://${app.server?.hostname}:${app.server?.port}/swagger`
);
console.log(
  `📦 Logestic is running at http://${app.server?.hostname}:${app.server?.port}/logestic`
);