import { type TSchema, t } from "elysia";
import { PaginationQueryDto } from "@app/auth/schemas/pagination-schema";

export const RequestDto = <T extends TSchema>(schema: T) =>
  t.Composite([
    PaginationQueryDto,
    // PaginationSortQueryDtoSchema(schema)
  ]);

// export type RequestDto<T extends TSchema> = Static<ReturnType<typeof RequestDto<T>>>;
