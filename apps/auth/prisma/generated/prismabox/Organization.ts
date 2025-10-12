import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const OrganizationPlain = t.Object({
  id: t.String(),
  name: t.String(),
  slug: __nullable__(t.String()),
  logo: __nullable__(t.String()),
  createdAt: t.Date(),
  metadata: __nullable__(t.String()),
});

export const OrganizationRelations = t.Object({
  organizationroles: t.Array(
    t.Object({
      id: t.String(),
      organizationId: t.String(),
      role: t.String(),
      permission: t.String(),
      createdAt: t.Date(),
      updatedAt: __nullable__(t.Date()),
    }),
    { additionalProperties: true },
  ),
  teams: t.Array(
    t.Object({
      id: t.String(),
      name: t.String(),
      organizationId: t.String(),
      createdAt: t.Date(),
      updatedAt: __nullable__(t.Date()),
    }),
    { additionalProperties: true },
  ),
  members: t.Array(
    t.Object({
      id: t.String(),
      organizationId: t.String(),
      userId: t.String(),
      role: t.String(),
      createdAt: t.Date(),
    }),
    { additionalProperties: true },
  ),
  invitations: t.Array(
    t.Object({
      id: t.String(),
      organizationId: t.String(),
      email: t.String(),
      role: __nullable__(t.String()),
      teamId: __nullable__(t.String()),
      status: t.String(),
      expiresAt: t.Date(),
      inviterId: t.String(),
    }),
    { additionalProperties: true },
  ),
});

export const OrganizationPlainInputCreate = t.Object({
  name: t.String(),
  slug: t.Optional(__nullable__(t.String())),
  logo: t.Optional(__nullable__(t.String())),
  createdAt: t.Date(),
  metadata: t.Optional(__nullable__(t.String())),
});

export const OrganizationPlainInputUpdate = t.Object({
  name: t.Optional(t.String()),
  slug: t.Optional(__nullable__(t.String())),
  logo: t.Optional(__nullable__(t.String())),
  createdAt: t.Optional(t.Date()),
  metadata: t.Optional(__nullable__(t.String())),
});

export const OrganizationRelationsInputCreate = t.Object({
  organizationroles: t.Optional(
    t.Object({
      connect: t.Array(
        t.Object({
          id: t.String(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
  teams: t.Optional(
    t.Object({
      connect: t.Array(
        t.Object({
          id: t.String(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
  members: t.Optional(
    t.Object({
      connect: t.Array(
        t.Object({
          id: t.String(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
  invitations: t.Optional(
    t.Object({
      connect: t.Array(
        t.Object({
          id: t.String(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
});

export const OrganizationRelationsInputUpdate = t.Partial(
  t.Object({
    organizationroles: t.Partial(
      t.Object({
        connect: t.Array(
          t.Object({
            id: t.String(),
          }),
          { additionalProperties: true },
        ),
        disconnect: t.Array(
          t.Object({
            id: t.String(),
          }),
          { additionalProperties: true },
        ),
      }),
    ),
    teams: t.Partial(
      t.Object({
        connect: t.Array(
          t.Object({
            id: t.String(),
          }),
          { additionalProperties: true },
        ),
        disconnect: t.Array(
          t.Object({
            id: t.String(),
          }),
          { additionalProperties: true },
        ),
      }),
    ),
    members: t.Partial(
      t.Object({
        connect: t.Array(
          t.Object({
            id: t.String(),
          }),
          { additionalProperties: true },
        ),
        disconnect: t.Array(
          t.Object({
            id: t.String(),
          }),
          { additionalProperties: true },
        ),
      }),
    ),
    invitations: t.Partial(
      t.Object({
        connect: t.Array(
          t.Object({
            id: t.String(),
          }),
          { additionalProperties: true },
        ),
        disconnect: t.Array(
          t.Object({
            id: t.String(),
          }),
          { additionalProperties: true },
        ),
      }),
    ),
  }),
);

export const OrganizationWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          name: t.String(),
          slug: t.String(),
          logo: t.String(),
          createdAt: t.Date(),
          metadata: t.String(),
        },
        { additionalProperties: true },
      ),
    { $id: "Organization" },
  ),
);

export const OrganizationWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            {
              id: t.String(),
              slug: t.String(),
              slug: t.Object(
                { slug: t.String() },
                { additionalProperties: true },
              ),
            },
            { additionalProperties: true },
          ),
          { additionalProperties: true },
        ),
        t.Union(
          [
            t.Object({ id: t.String() }),
            t.Object({ slug: t.String() }),
            t.Object({
              slug: t.Object(
                { slug: t.String() },
                { additionalProperties: true },
              ),
            }),
          ],
          { additionalProperties: true },
        ),
        t.Partial(
          t.Object({
            AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
            NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
            OR: t.Array(Self, { additionalProperties: true }),
          }),
          { additionalProperties: true },
        ),
        t.Partial(
          t.Object({
            id: t.String(),
            name: t.String(),
            slug: t.String(),
            logo: t.String(),
            createdAt: t.Date(),
            metadata: t.String(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "Organization" },
);

export const OrganizationSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    name: t.Boolean(),
    slug: t.Boolean(),
    logo: t.Boolean(),
    createdAt: t.Boolean(),
    metadata: t.Boolean(),
    organizationroles: t.Boolean(),
    teams: t.Boolean(),
    members: t.Boolean(),
    invitations: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const OrganizationInclude = t.Partial(
  t.Object({
    organizationroles: t.Boolean(),
    teams: t.Boolean(),
    members: t.Boolean(),
    invitations: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const OrganizationOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    name: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    slug: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    logo: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    metadata: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
  }),
);

export const Organization = t.Composite([
  OrganizationPlain,
  OrganizationRelations,
]);

export const OrganizationInputCreate = t.Composite([
  OrganizationPlainInputCreate,
  OrganizationRelationsInputCreate,
]);

export const OrganizationInputUpdate = t.Composite([
  OrganizationPlainInputUpdate,
  OrganizationRelationsInputUpdate,
]);
