import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const TeamMemberPlain = t.Object({
  id: t.String(),
  teamId: t.String(),
  userId: t.String(),
  createdAt: __nullable__(t.Date()),
});

export const TeamMemberRelations = t.Object({
  team: t.Object({
    id: t.String(),
    name: t.String(),
    organizationId: t.String(),
    createdAt: t.Date(),
    updatedAt: __nullable__(t.Date()),
  }),
  user: t.Object({
    id: t.String(),
    email: t.String(),
    name: __nullable__(
      t.String({ description: `FAKE:faker.person.fullName()` }),
    ),
    createdAt: t.Date(),
    updatedAt: t.Date(),
    emailVerified: t.Boolean({
      description: `FAKE:faker.datatype.boolean({ probability: 0.5 })`,
    }),
    image: __nullable__(t.String({ description: `FAKE:faker.image.avatar()` })),
  }),
});

export const TeamMemberPlainInputCreate = t.Object({
  createdAt: t.Optional(__nullable__(t.Date())),
});

export const TeamMemberPlainInputUpdate = t.Object({
  createdAt: t.Optional(__nullable__(t.Date())),
});

export const TeamMemberRelationsInputCreate = t.Object({
  team: t.Object({
    connect: t.Object({
      id: t.String(),
    }),
  }),
  user: t.Object({
    connect: t.Object({
      id: t.String(),
    }),
  }),
});

export const TeamMemberRelationsInputUpdate = t.Partial(
  t.Object({
    team: t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
    user: t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
  }),
);

export const TeamMemberWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          teamId: t.String(),
          userId: t.String(),
          createdAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "TeamMember" },
  ),
);

export const TeamMemberWhereUnique = t.Recursive(
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
            teamId: t.String(),
            userId: t.String(),
            createdAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "TeamMember" },
);

export const TeamMemberSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    teamId: t.Boolean(),
    team: t.Boolean(),
    userId: t.Boolean(),
    user: t.Boolean(),
    createdAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const TeamMemberInclude = t.Partial(
  t.Object({ team: t.Boolean(), user: t.Boolean(), _count: t.Boolean() }),
);

export const TeamMemberOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    teamId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    userId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
  }),
);

export const TeamMember = t.Composite([TeamMemberPlain, TeamMemberRelations]);

export const TeamMemberInputCreate = t.Composite([
  TeamMemberPlainInputCreate,
  TeamMemberRelationsInputCreate,
]);

export const TeamMemberInputUpdate = t.Composite([
  TeamMemberPlainInputUpdate,
  TeamMemberRelationsInputUpdate,
]);
