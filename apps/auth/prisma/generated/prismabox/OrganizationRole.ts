import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const OrganizationRolePlain = t.Object({
  id: t.String(),
  organizationId: t.String(),
  role: t.String(),
  permission: t.String(),
  createdAt: t.Date(),
  updatedAt: __nullable__(t.Date()),
});

export const OrganizationRoleRelations = t.Object({
  organization: t.Object({
    id: t.String(),
    name: t.String(),
    slug: __nullable__(t.String()),
    logo: __nullable__(t.String()),
    createdAt: t.Date(),
    metadata: __nullable__(t.String()),
  }),
});

export const OrganizationRolePlainInputCreate = t.Object({
  role: t.String(),
  permission: t.String(),
});

export const OrganizationRolePlainInputUpdate = t.Object({
  role: t.Optional(t.String()),
  permission: t.Optional(t.String()),
});

export const OrganizationRoleRelationsInputCreate = t.Object({
  organization: t.Object({
    connect: t.Object({
      id: t.String(),
    }),
  }),
});

export const OrganizationRoleRelationsInputUpdate = t.Partial(
  t.Object({
    organization: t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
  }),
);

export const OrganizationRoleWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          organizationId: t.String(),
          role: t.String(),
          permission: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "OrganizationRole" },
  ),
);

export const OrganizationRoleWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ id: t.String() }, { additionalProperties: true }),
          { additionalProperties: true },
        ),
        t.Union([t.Object({ id: t.String() })], { additionalProperties: true }),
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
            organizationId: t.String(),
            role: t.String(),
            permission: t.String(),
            createdAt: t.Date(),
            updatedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "OrganizationRole" },
);

export const OrganizationRoleSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    organizationId: t.Boolean(),
    organization: t.Boolean(),
    role: t.Boolean(),
    permission: t.Boolean(),
    createdAt: t.Boolean(),
    updatedAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const OrganizationRoleInclude = t.Partial(
  t.Object({ organization: t.Boolean(), _count: t.Boolean() }),
);

export const OrganizationRoleOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    organizationId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    role: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    permission: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
  }),
);

export const OrganizationRole = t.Composite([
  OrganizationRolePlain,
  OrganizationRoleRelations,
]);

export const OrganizationRoleInputCreate = t.Composite([
  OrganizationRolePlainInputCreate,
  OrganizationRoleRelationsInputCreate,
]);

export const OrganizationRoleInputUpdate = t.Composite([
  OrganizationRolePlainInputUpdate,
  OrganizationRoleRelationsInputUpdate,
]);
