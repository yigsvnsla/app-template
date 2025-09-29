import { type Static, t } from "elysia";

export const PaginationDto = t.Readonly(
  t.Object({
    page: t.Number({ default: 0 }),
    limit: t.Number({ default: 0 }),
    total: t.Number({ default: 0 }),
    totalPages: t.Number({ default: 0 }),
    hasPreviousPage: t.Boolean({ default: false }),
    hasNextPage: t.Boolean({ default: false }),
  }),
);

export type PaginationDto = Static<typeof PaginationDto>;

export const PaginationQueryDto = t.Object({
  offset: t.Number({
    default: 1,
  }),

  limit: t.Number({
    default: 10,
    maximum: 100,
    minimum: 1,
  }),
});

export type PaginationQueryDto = Static<typeof PaginationDto>;
