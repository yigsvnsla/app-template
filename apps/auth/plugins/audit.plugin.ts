import type { APIError, BetterAuthPlugin } from 'better-auth';
import { getSessionFromCtx } from 'better-auth/api';
import { createAuthMiddleware } from 'better-auth/plugins';
export function AuditPlugin(): BetterAuthPlugin {
  return <BetterAuthPlugin>{
    id: 'audit-plugin',

    schema: {
      audit: {
        fields: {
          id: {
            type: 'string',
            unique: true,
          },
          user: {
            type: 'string',
            unique: true,
            references: {
              model: 'user',
              field: 'id',
              onDelete: 'no action',
            },
          },
          action: {
            type: 'string',
            unique: false,
          },
          resource: {
            type: 'string',
            unique: false,
          },
          timestamp: {
            type: 'date',
            unique: false,
            defaultValue: () => new Date(Date.now()),
          },
        },
        modelName: 'audit',
      },
    },
    hooks: {
      after: [
        {
          matcher: (context) => {
            return true;
          },
          handler: createAuthMiddleware(async (ctx) => {
            const session = await getSessionFromCtx(ctx);
            console.dir(ctx.context);

            const { returned } = ctx.context;
            console.table({ returned });

            console.table({
              timestamp: new Date(Date.now()).toISOString(),
              action: (ctx.context.returned as APIError).name,
              resource: ctx.path,
              user: session?.user.id,
            });

            return;
            // //do something before the request
            // return {
            //   context: ctx, // if you want to modify the context
            // };
          }),
        },
      ],
    },
  };
}
