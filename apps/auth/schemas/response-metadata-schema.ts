import { type Static, t } from "elysia";
import { PaginationDto } from "@app/auth/schemas/pagination-schema";

export const ResponseMetadaDto = t.Object({
  // message: t.String(),
  status: t.String(),
  code: t.Number(),
  pagination: t.Readonly(t.Nullable(PaginationDto)),
});

export type ResponseMetadaDto = Static<typeof ResponseMetadaDto>;
