import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const UserPlain = t.Object({
  id: t.String(),
  email: t.String(),
  name: __nullable__(t.String()),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  emailVerified: t.Boolean(),
  image: __nullable__(t.String()),
});

export const UserRelations = t.Object({
  sessions: t.Array(
    t.Object({
      id: t.String(),
      expiresAt: t.Date(),
      token: t.String(),
      createdAt: t.Date(),
      updatedAt: t.Date(),
      ipAddress: __nullable__(t.String()),
      userAgent: __nullable__(t.String()),
      userId: t.String(),
      activeOrganizationId: __nullable__(t.String()),
      activeTeamId: __nullable__(t.String()),
    }),
    { additionalProperties: true },
  ),
  accounts: t.Array(
    t.Object({
      id: t.String(),
      accountId: t.String(),
      providerId: t.String(),
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
    }),
    { additionalProperties: true },
  ),
  teammembers: t.Array(
    t.Object({
      id: t.String(),
      teamId: t.String(),
      userId: t.String(),
      createdAt: __nullable__(t.Date()),
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

export const UserPlainInputCreate = t.Object({
  email: t.String(),
  name: t.Optional(__nullable__(t.String())),
  emailVerified: t.Optional(t.Boolean()),
  image: t.Optional(__nullable__(t.String())),
});

export const UserPlainInputUpdate = t.Object({
  email: t.Optional(t.String()),
  name: t.Optional(__nullable__(t.String())),
  emailVerified: t.Optional(t.Boolean()),
  image: t.Optional(__nullable__(t.String())),
});

export const UserRelationsInputCreate = t.Object({
  sessions: t.Optional(
    t.Object({
      connect: t.Array(
        t.Object({
          id: t.String(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
  accounts: t.Optional(
    t.Object({
      connect: t.Array(
        t.Object({
          id: t.String(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
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

export const UserRelationsInputUpdate = t.Partial(
  t.Object({
    sessions: t.Partial(
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
    accounts: t.Partial(
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

export const UserWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          email: t.String(),
          name: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
          emailVerified: t.Boolean(),
          image: t.String(),
        },
        { additionalProperties: true },
      ),
    { $id: "User" },
  ),
);

export const UserWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), email: t.String() },
            { additionalProperties: true },
          ),
          { additionalProperties: true },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ email: t.String() })],
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
            email: t.String(),
            name: t.String(),
            createdAt: t.Date(),
            updatedAt: t.Date(),
            emailVerified: t.Boolean(),
            image: t.String(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "User" },
);

export const UserSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    email: t.Boolean(),
    name: t.Boolean(),
    createdAt: t.Boolean(),
    updatedAt: t.Boolean(),
    emailVerified: t.Boolean(),
    image: t.Boolean(),
    sessions: t.Boolean(),
    accounts: t.Boolean(),
    teammembers: t.Boolean(),
    members: t.Boolean(),
    invitations: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const UserInclude = t.Partial(
  t.Object({
    sessions: t.Boolean(),
    accounts: t.Boolean(),
    teammembers: t.Boolean(),
    members: t.Boolean(),
    invitations: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const UserOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    email: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    name: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    emailVerified: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    image: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
  }),
);

export const User = t.Composite([UserPlain, UserRelations]);

export const UserInputCreate = t.Composite([
  UserPlainInputCreate,
  UserRelationsInputCreate,
]);

export const UserInputUpdate = t.Composite([
  UserPlainInputUpdate,
  UserRelationsInputUpdate,
]);
