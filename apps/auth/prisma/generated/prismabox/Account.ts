import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const AccountPlain = t.Object({
  id: t.String(),
  accountId: t.String({ description: `FAKE:faker.string.uuid()` }),
  providerId: t.String({ description: `FAKE:faker.string.uuid()` }),
  userId: t.String(),
  accessToken: __nullable__(t.String()),
  refreshToken: __nullable__(t.String()),
  idToken: __nullable__(t.String()),
  accessTokenExpiresAt: __nullable__(t.Date()),
  refreshTokenExpiresAt: __nullable__(t.Date()),
  scope: __nullable__(t.String()),
  password: __nullable__(t.String()),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const AccountRelations = t.Object({
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

export const AccountPlainInputCreate = t.Object({
  accessToken: t.Optional(__nullable__(t.String())),
  refreshToken: t.Optional(__nullable__(t.String())),
  idToken: t.Optional(__nullable__(t.String())),
  accessTokenExpiresAt: t.Optional(__nullable__(t.Date())),
  refreshTokenExpiresAt: t.Optional(__nullable__(t.Date())),
  scope: t.Optional(__nullable__(t.String())),
  password: t.Optional(__nullable__(t.String())),
});

export const AccountPlainInputUpdate = t.Object({
  accessToken: t.Optional(__nullable__(t.String())),
  refreshToken: t.Optional(__nullable__(t.String())),
  idToken: t.Optional(__nullable__(t.String())),
  accessTokenExpiresAt: t.Optional(__nullable__(t.Date())),
  refreshTokenExpiresAt: t.Optional(__nullable__(t.Date())),
  scope: t.Optional(__nullable__(t.String())),
  password: t.Optional(__nullable__(t.String())),
});

export const AccountRelationsInputCreate = t.Object({
  user: t.Object({
    connect: t.Object({
      id: t.String(),
    }),
  }),
});

export const AccountRelationsInputUpdate = t.Partial(
  t.Object({
    user: t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
  }),
);

export const AccountWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          accountId: t.String({ description: `FAKE:faker.string.uuid()` }),
          providerId: t.String({ description: `FAKE:faker.string.uuid()` }),
          userId: t.String(),
          accessToken: t.String(),
          refreshToken: t.String(),
          idToken: t.String(),
          accessTokenExpiresAt: t.Date(),
          refreshTokenExpiresAt: t.Date(),
          scope: t.String(),
          password: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "Account" },
  ),
);

export const AccountWhereUnique = t.Recursive(
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
            accountId: t.String({ description: `FAKE:faker.string.uuid()` }),
            providerId: t.String({ description: `FAKE:faker.string.uuid()` }),
            userId: t.String(),
            accessToken: t.String(),
            refreshToken: t.String(),
            idToken: t.String(),
            accessTokenExpiresAt: t.Date(),
            refreshTokenExpiresAt: t.Date(),
            scope: t.String(),
            password: t.String(),
            createdAt: t.Date(),
            updatedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "Account" },
);

export const AccountSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    accountId: t.Boolean(),
    providerId: t.Boolean(),
    userId: t.Boolean(),
    user: t.Boolean(),
    accessToken: t.Boolean(),
    refreshToken: t.Boolean(),
    idToken: t.Boolean(),
    accessTokenExpiresAt: t.Boolean(),
    refreshTokenExpiresAt: t.Boolean(),
    scope: t.Boolean(),
    password: t.Boolean(),
    createdAt: t.Boolean(),
    updatedAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const AccountInclude = t.Partial(
  t.Object({ user: t.Boolean(), _count: t.Boolean() }),
);

export const AccountOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    accountId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    providerId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    userId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    accessToken: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    refreshToken: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    idToken: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    accessTokenExpiresAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    refreshTokenExpiresAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    scope: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    password: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Account = t.Composite([AccountPlain, AccountRelations]);

export const AccountInputCreate = t.Composite([
  AccountPlainInputCreate,
  AccountRelationsInputCreate,
]);

export const AccountInputUpdate = t.Composite([
  AccountPlainInputUpdate,
  AccountRelationsInputUpdate,
]);
