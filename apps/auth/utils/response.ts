import { InvertedStatusMap } from "elysia";
import type { PaginationDto } from "../schemas/pagination-schema";
import type { ResponseMetadaDto } from "../schemas/response-metadata-schema";

export const metadataHandler = (
  status: keyof InvertedStatusMap,
  pagination?: PaginationDto,
): ResponseMetadaDto =>
  ({
    // message: "ok",
    status: InvertedStatusMap[status],
    code: status,
    pagination: pagination ?? null, // 👈 normaliza undefined → null
  }) satisfies ResponseMetadaDto;

export const responseHandler = <T>(
  data: T,
  meta: ResponseMetadaDto,
): { data: T; meta: ResponseMetadaDto } => ({
  data,
  meta,
});
