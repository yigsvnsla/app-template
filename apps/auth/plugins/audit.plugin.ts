import { exists, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';

import type { BetterAuthPlugin } from 'better-auth';
import { APIError } from 'better-auth/api';
import { getSessionFromCtx } from 'better-auth/api';
import { createAuthMiddleware } from 'better-auth/plugins';

export interface AuditPluginOptions {
  path: string | string[];
}

export function AuditPlugin(
  opts = { path: ['/.logs'] } satisfies AuditPluginOptions,
) {
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
            return (
              ctx.request?.url.includes(`${ctx.context.options.basePath}`) ??
              false
            );
          },
          handler: createAuthMiddleware(async (ctx) => {
            if (ctx.context.returned instanceof APIError) {
              if (ctx.context.returned.statusCode >= 400) {
                ctx.context.logger.error(
                  `(${ctx.context.returned.name}: ${ctx.path}) ${ctx.context.returned.body?.code} | ${ctx.context.returned.body?.message}`,
                );
              }
            } else {
              const session = await getSessionFromCtx(ctx);
              ctx.context.logger.success(
                `(${session?.user.id ?? 'OUT USER'}: ${ctx.path})`,
              );
            }

            return;
          }),
        },
      ],
    },
  } satisfies BetterAuthPlugin;
}

// writeLogs();
// console.log(
//   await ctx.context.adapter.count({
//     model: 'audit',
//   }),
// );

// console.table({
//   timestamp: new Date(Date.now()).toISOString(),
//   action: (ctx.context.returned as APIError).name,
//   resource: ctx.path,
//   user: session?.user.id,
// });

// function writeLogs() {
//   const pathLog = join(
//     cwd(),
//     ...(Array.isArray(opts.path) ? opts.path : [opts.path]),
//   );
//   if (!exists(pathLog)) mkdir(pathLog);
// }

// writeLogs();
