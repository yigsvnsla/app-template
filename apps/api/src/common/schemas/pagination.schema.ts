import { InvertedStatusMap, StatusMap, type TSchema, t } from 'elysia';

export const ORDER_PAGINATION = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;

export const TAKE_PAGINATION = {
  MIN: 10,
  MAX: 50,
} as const;

export const PAGE_PAGINATION = {
  MIN: 1,
} as const;

export const paginationOrderQuerySchema = <T extends TSchema>(schema: T) =>
  t.Object({
    sortBy: t.KeyOf(schema, {
      default: 'id',
    }),

    order: t.Enum(ORDER_PAGINATION, {
      default: ORDER_PAGINATION.ASC,
    }),
  });

export const paginationQuerySchema = t.Object({
  page: t.Integer({
    default: PAGE_PAGINATION.MIN,
  }),

  take: t.Integer({
    default: TAKE_PAGINATION.MIN,
    maximum: TAKE_PAGINATION.MAX,
  }),
});

export const PaginationSchema = t.Object({
  page: t.Number(),
  take: t.Number(),
  itemCount: t.Number(),
  pageCount: t.Number(),
  hasPreviousPage: t.Boolean(),
  hasNextPage: t.Boolean(),
});

export const ResponseMedatadaSchema = t.Object({
  message: t.String(),
  status: t.Enum(StatusMap),
  code: t.Enum(InvertedStatusMap),
  pagination: PaginationSchema,
});

export const responseSchema = <T extends TSchema>(schema: T) => {
  return t.Object({
    data: t.Union([t.Array(schema), schema]),
    meta: ResponseMedatadaSchema,
  });
};

// export default class PageMetaDto {
//   // @ApiProperty()
//   readonly page: number;

//   // @ApiProperty()
//   readonly take: number;

//   // @ApiProperty()
//   readonly itemCount: number;

//   // @ApiProperty()
//   readonly pageCount: number;

//   // @ApiProperty()
//   readonly hasPreviousPage: boolean;

//   // @ApiProperty()
//   readonly hasNextPage: boolean;

//   constructor({ pageOptionsDto, itemCount }: PageMetaParameters) {
//     this.page = pageOptionsDto.page;
//     this.take = pageOptionsDto.take;
//     this.itemCount = itemCount;
//     this.pageCount = Math.ceil(this.itemCount / this.take);
//     this.hasPreviousPage = this.page > 1;
//     this.hasNextPage = this.page < this.pageCount;
//   }
// }

/**
 * todo: create ony string validator to prop "Order"
 */
// export class PageOptionsDto {
//   @IsOptional()
//   @IsObject()
//   public readonly order: Order<OrderBy>;

//   @Type(() => Number)
//   @IsInt()
//   @Min(1)
//   @IsOptional()
//   readonly page?: number = 1;

//   @Type(() => Number)
//   @IsInt()
//   @Min(1)
//   @Max(50)
//   @IsOptional()
//   readonly take?: number = 10;

//   public get skip(): number {
//     return (this.page - 1) * this.take;
//   }
// }
