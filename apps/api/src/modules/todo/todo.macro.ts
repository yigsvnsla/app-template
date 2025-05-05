import { betterAuthClient } from '@package/clients/better-auth.client';
import { ApiPaths as BetterAuthApiPaths } from '@package/clients/better-auth.openapi';
import { Elysia, StatusMap, t } from 'elysia';
import logixlysia from 'logixlysia';

export const todoMacros = new Elysia()
.use(logixlysia())
.macro({
  permissionToReadTodos: {
    async resolve(ctx) {
      const { error, data } = await betterAuthClient.POST(
        BetterAuthApiPaths.PostAdminHaspermission,
        {
          headers: ctx.headers,
          body: {
            permissions: {
              todo: ['read'],
            },
          },
        },
      );

      if (error) {
        return ctx.error(StatusMap['Bad Request'], error);
      }

      if (!data.success) {
        return ctx.error(StatusMap.Forbidden, {
          message: 'NO TIENES PERMISOS PARA ESTE METODO',
        });
      }

      return {};
    },
  },
});
