import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const MemberPlain = t.Object({
  id: t.String(),
  organizationId: t.String(),
  userId: t.String(),
  role: t.String(),
  createdAt: t.Date(),
});

export const MemberRelations = t.Object({
  organization: t.Object({
    id: t.String(),
    name: t.String(),
    slug: __nullable__(t.String()),
    logo: __nullable__(t.String()),
    createdAt: t.Date(),
    metadata: __nullable__(t.String()),
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

export const MemberPlainInputCreate = t.Object({
  role: t.String(),
  createdAt: t.Date(),
});

export const MemberPlainInputUpdate = t.Object({
  role: t.Optional(t.String()),
  createdAt: t.Optional(t.Date()),
});

export const MemberRelationsInputCreate = t.Object({
  organization: t.Object({
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

export const MemberRelationsInputUpdate = t.Partial(
  t.Object({
    organization: t.Object({
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

export const MemberWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          organizationId: t.String(),
          userId: t.String(),
          role: t.String(),
          createdAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "Member" },
  ),
);

export const MemberWhereUnique = t.Recursive(
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
            userId: t.String(),
            role: t.String(),
            createdAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "Member" },
);

export const MemberSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    organizationId: t.Boolean(),
    organization: t.Boolean(),
    userId: t.Boolean(),
    user: t.Boolean(),
    role: t.Boolean(),
    createdAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const MemberInclude = t.Partial(
  t.Object({
    organization: t.Boolean(),
    user: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const MemberOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    organizationId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    userId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    role: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
  }),
);

export const Member = t.Composite([MemberPlain, MemberRelations]);

export const MemberInputCreate = t.Composite([
  MemberPlainInputCreate,
  MemberRelationsInputCreate,
]);

export const MemberInputUpdate = t.Composite([
  MemberPlainInputUpdate,
  MemberRelationsInputUpdate,
]);
