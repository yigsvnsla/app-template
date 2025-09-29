import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const VerificationPlain = t.Object({
  id: t.String(),
  identifier: t.String(),
  value: t.String(),
  expiresAt: t.Date(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const VerificationRelations = t.Object({});

export const VerificationPlainInputCreate = t.Object({
  identifier: t.String(),
  value: t.String(),
  expiresAt: t.Date(),
});

export const VerificationPlainInputUpdate = t.Object({
  identifier: t.Optional(t.String()),
  value: t.Optional(t.String()),
  expiresAt: t.Optional(t.Date()),
});

export const VerificationRelationsInputCreate = t.Object({});

export const VerificationRelationsInputUpdate = t.Partial(t.Object({}));

export const VerificationWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          identifier: t.String(),
          value: t.String(),
          expiresAt: t.Date(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "Verification" },
  ),
);

export const VerificationWhereUnique = t.Recursive(
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
            identifier: t.String(),
            value: t.String(),
            expiresAt: t.Date(),
            createdAt: t.Date(),
            updatedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "Verification" },
);

export const VerificationSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    identifier: t.Boolean(),
    value: t.Boolean(),
    expiresAt: t.Boolean(),
    createdAt: t.Boolean(),
    updatedAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const VerificationInclude = t.Partial(t.Object({ _count: t.Boolean() }));

export const VerificationOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    identifier: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    value: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    expiresAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Verification = t.Composite([
  VerificationPlain,
  VerificationRelations,
]);

export const VerificationInputCreate = t.Composite([
  VerificationPlainInputCreate,
  VerificationRelationsInputCreate,
]);

export const VerificationInputUpdate = t.Composite([
  VerificationPlainInputUpdate,
  VerificationRelationsInputUpdate,
]);
