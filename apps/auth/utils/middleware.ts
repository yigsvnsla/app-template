import Elysia from "elysia";
import { auth } from "./auth";

// user middleware (compute user and session and pass to routes)
export const middleware = new Elysia({ name: "better-auth" })
  .mount(auth.handler, { detail: { hide: true } })
  .macro({
    auth: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });

        if (!session) return status(401);

        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  })
  .get("/user", ({ user }) => user, {
    auth: true,
  });
