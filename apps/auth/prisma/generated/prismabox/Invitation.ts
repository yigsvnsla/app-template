import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const InvitationPlain = t.Object({
  id: t.String(),
  organizationId: t.String(),
  email: t.String(),
  role: __nullable__(t.String()),
  teamId: __nullable__(t.String()),
  status: t.String(),
  expiresAt: t.Date(),
  inviterId: t.String(),
});

export const InvitationRelations = t.Object({
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

export const InvitationPlainInputCreate = t.Object({
  email: t.String(),
  role: t.Optional(__nullable__(t.String())),
  status: t.String(),
  expiresAt: t.Date(),
});

export const InvitationPlainInputUpdate = t.Object({
  email: t.Optional(t.String()),
  role: t.Optional(__nullable__(t.String())),
  status: t.Optional(t.String()),
  expiresAt: t.Optional(t.Date()),
});

export const InvitationRelationsInputCreate = t.Object({
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

export const InvitationRelationsInputUpdate = t.Partial(
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

export const InvitationWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          organizationId: t.String(),
          email: t.String(),
          role: t.String(),
          teamId: t.String(),
          status: t.String(),
          expiresAt: t.Date(),
          inviterId: t.String(),
        },
        { additionalProperties: true },
      ),
    { $id: "Invitation" },
  ),
);

export const InvitationWhereUnique = t.Recursive(
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
            email: t.String(),
            role: t.String(),
            teamId: t.String(),
            status: t.String(),
            expiresAt: t.Date(),
            inviterId: t.String(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "Invitation" },
);

export const InvitationSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    organizationId: t.Boolean(),
    organization: t.Boolean(),
    email: t.Boolean(),
    role: t.Boolean(),
    teamId: t.Boolean(),
    status: t.Boolean(),
    expiresAt: t.Boolean(),
    inviterId: t.Boolean(),
    user: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const InvitationInclude = t.Partial(
  t.Object({
    organization: t.Boolean(),
    user: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const InvitationOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    organizationId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    email: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    role: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    teamId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    status: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    expiresAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    inviterId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
  }),
);

export const Invitation = t.Composite([InvitationPlain, InvitationRelations]);

export const InvitationInputCreate = t.Composite([
  InvitationPlainInputCreate,
  InvitationRelationsInputCreate,
]);

export const InvitationInputUpdate = t.Composite([
  InvitationPlainInputUpdate,
  InvitationRelationsInputUpdate,
]);
