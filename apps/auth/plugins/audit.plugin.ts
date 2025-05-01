import {} from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';

import type { APIError, BetterAuthPlugin } from 'better-auth';
import { getSessionFromCtx } from 'better-auth/api';
import { createAuthMiddleware } from 'better-auth/plugins';
console.log(join(cwd(), 'log'));

export function AuditPlugin() {
  return {
    id: 'audit-plugin',

    schema: {
      audit: {
        fields: {
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
          matcher: (ctx) => {
            return true;
          },
          handler: createAuthMiddleware(async (ctx) => {
            const session = await getSessionFromCtx(ctx);
            const logger = ctx.context.logger;
            console.log(
              await ctx.context.adapter.count({
                model: 'audit',
              }),
            );
            // console.dir(ctx.context);
            console.table(ctx.context.returned);
            console.table({
              timestamp: new Date(Date.now()).toISOString(),
              action: (ctx.context.returned as APIError).name,
              resource: ctx.path,
              user: session?.user.id,
            });

            return;
          }),
        },
      ],
    },
  } satisfies BetterAuthPlugin;
}
