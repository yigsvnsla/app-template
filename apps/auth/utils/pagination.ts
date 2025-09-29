import type { PaginationDto } from "@app/auth/schemas/pagination-schema";

export const paginationHandler = (page: number, limit: number, total: number) =>
  ({
    page,
    limit,
    total,
    totalPages: limit > 0 ? Math.ceil(total / limit) : 0,
    hasNextPage: page < (limit > 0 ? Math.ceil(total / limit) : 0),
    hasPreviousPage: page > 1,
  }) satisfies PaginationDto;
