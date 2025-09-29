import { type Static, type TSchema, t } from "elysia";
import { ResponseMetadaDto } from "./response-metadata-schema";

export const ResponseDto = <T extends TSchema>(schema: T) => {
  return t.Object({
    data: t.Nullable(t.Readonly(schema)),
    meta: t.Readonly(ResponseMetadaDto),
  });
};

export type ResponseDto<T extends TSchema> = Static<ReturnType<typeof ResponseDto<T>>>;
