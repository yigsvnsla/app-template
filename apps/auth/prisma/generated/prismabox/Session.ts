import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const SessionPlain = t.Object({
  id: t.String(),
  expiresAt: t.Date(),
  token: t.String({ description: `FAKE:faker.internet.jwt()` }),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  ipAddress: __nullable__(
    t.String({ description: `FAKE:faker.internet.ipv4()` }),
  ),
  userAgent: __nullable__(
    t.String({ description: `FAKE:faker.internet.userAgent()` }),
  ),
  userId: t.String(),
  activeOrganizationId: __nullable__(t.String()),
  activeTeamId: __nullable__(t.String()),
});

export const SessionRelations = t.Object({
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

export const SessionPlainInputCreate = t.Object({
  expiresAt: t.Date(),
  token: t.String({ description: `FAKE:faker.internet.jwt()` }),
  ipAddress: t.Optional(
    __nullable__(t.String({ description: `FAKE:faker.internet.ipv4()` })),
  ),
  userAgent: t.Optional(
    __nullable__(t.String({ description: `FAKE:faker.internet.userAgent()` })),
  ),
});

export const SessionPlainInputUpdate = t.Object({
  expiresAt: t.Optional(t.Date()),
  token: t.Optional(t.String({ description: `FAKE:faker.internet.jwt()` })),
  ipAddress: t.Optional(
    __nullable__(t.String({ description: `FAKE:faker.internet.ipv4()` })),
  ),
  userAgent: t.Optional(
    __nullable__(t.String({ description: `FAKE:faker.internet.userAgent()` })),
  ),
});

export const SessionRelationsInputCreate = t.Object({
  user: t.Object({
    connect: t.Object({
      id: t.String(),
    }),
  }),
});

export const SessionRelationsInputUpdate = t.Partial(
  t.Object({
    user: t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
  }),
);

export const SessionWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          expiresAt: t.Date(),
          token: t.String({ description: `FAKE:faker.internet.jwt()` }),
          createdAt: t.Date(),
          updatedAt: t.Date(),
          ipAddress: t.String({ description: `FAKE:faker.internet.ipv4()` }),
          userAgent: t.String({
            description: `FAKE:faker.internet.userAgent()`,
          }),
          userId: t.String(),
          activeOrganizationId: t.String(),
          activeTeamId: t.String(),
        },
        { additionalProperties: true },
      ),
    { $id: "Session" },
  ),
);

export const SessionWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            {
              id: t.String(),
              token: t.String({ description: `FAKE:faker.internet.jwt()` }),
              token: t.Object(
                {
                  token: t.String({ description: `FAKE:faker.internet.jwt()` }),
                },
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
            t.Object({
              token: t.String({ description: `FAKE:faker.internet.jwt()` }),
            }),
            t.Object({
              token: t.Object(
                {
                  token: t.String({ description: `FAKE:faker.internet.jwt()` }),
                },
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
            expiresAt: t.Date(),
            token: t.String({ description: `FAKE:faker.internet.jwt()` }),
            createdAt: t.Date(),
            updatedAt: t.Date(),
            ipAddress: t.String({ description: `FAKE:faker.internet.ipv4()` }),
            userAgent: t.String({
              description: `FAKE:faker.internet.userAgent()`,
            }),
            userId: t.String(),
            activeOrganizationId: t.String(),
            activeTeamId: t.String(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "Session" },
);

export const SessionSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    expiresAt: t.Boolean(),
    token: t.Boolean(),
    createdAt: t.Boolean(),
    updatedAt: t.Boolean(),
    ipAddress: t.Boolean(),
    userAgent: t.Boolean(),
    userId: t.Boolean(),
    user: t.Boolean(),
    activeOrganizationId: t.Boolean(),
    activeTeamId: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const SessionInclude = t.Partial(
  t.Object({ user: t.Boolean(), _count: t.Boolean() }),
);

export const SessionOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    expiresAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    token: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    ipAddress: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    userAgent: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    userId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    activeOrganizationId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    activeTeamId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
  }),
);

export const Session = t.Composite([SessionPlain, SessionRelations]);

export const SessionInputCreate = t.Composite([
  SessionPlainInputCreate,
  SessionRelationsInputCreate,
]);

export const SessionInputUpdate = t.Composite([
  SessionPlainInputUpdate,
  SessionRelationsInputUpdate,
]);
