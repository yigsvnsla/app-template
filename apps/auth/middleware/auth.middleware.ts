import Elysia from 'elysia';
import { auth } from '../utils/auth';

// user middleware (compute user and session and pass to routes)
export const betterAuth = new Elysia({ name: 'better-auth' })
  .mount((ctx) => {
    // ctx.headers.delete('origin');
    // ctx.headers.set('origin', 'http://localhost:5173');
    // console.log(ctx.headers);
    return auth.handler(ctx);
  })
  .macro({
    auth: {
      async resolve({ error, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });

        if (!session) return error(401);

        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  });
