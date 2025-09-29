import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const TeamPlain = t.Object({
  id: t.String(),
  name: t.String(),
  organizationId: t.String(),
  createdAt: t.Date(),
  updatedAt: __nullable__(t.Date()),
});

export const TeamRelations = t.Object({
  organization: t.Object({
    id: t.String(),
    name: t.String(),
    slug: __nullable__(t.String()),
    logo: __nullable__(t.String()),
    createdAt: t.Date(),
    metadata: __nullable__(t.String()),
  }),
  teammembers: t.Array(
    t.Object({
      id: t.String(),
      teamId: t.String(),
      userId: t.String(),
      createdAt: __nullable__(t.Date()),
    }),
    { additionalProperties: true },
  ),
});

export const TeamPlainInputCreate = t.Object({
  name: t.String(),
  createdAt: t.Date(),
});

export const TeamPlainInputUpdate = t.Object({
  name: t.Optional(t.String()),
  createdAt: t.Optional(t.Date()),
});

export const TeamRelationsInputCreate = t.Object({
  organization: t.Object({
    connect: t.Object({
      id: t.String(),
    }),
  }),
  teammembers: t.Optional(
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

export const TeamRelationsInputUpdate = t.Partial(
  t.Object({
    organization: t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
    teammembers: t.Partial(
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

export const TeamWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          name: t.String(),
          organizationId: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "Team" },
  ),
);

export const TeamWhereUnique = t.Recursive(
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
            name: t.String(),
            organizationId: t.String(),
            createdAt: t.Date(),
            updatedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "Team" },
);

export const TeamSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    name: t.Boolean(),
    organizationId: t.Boolean(),
    organization: t.Boolean(),
    createdAt: t.Boolean(),
    updatedAt: t.Boolean(),
    teammembers: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const TeamInclude = t.Partial(
  t.Object({
    organization: t.Boolean(),
    teammembers: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const TeamOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    name: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    organizationId: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Team = t.Composite([TeamPlain, TeamRelations]);

export const TeamInputCreate = t.Composite([
  TeamPlainInputCreate,
  TeamRelationsInputCreate,
]);

export const TeamInputUpdate = t.Composite([
  TeamPlainInputUpdate,
  TeamRelationsInputUpdate,
]);
