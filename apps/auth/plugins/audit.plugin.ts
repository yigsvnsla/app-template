import type { BetterAuthPlugin } from 'better-auth';

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
      before: [
        {
          matcher: () => true,
          handler: () => true,
        },
      ],
    },
  };
}
