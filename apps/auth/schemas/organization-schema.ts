import { t } from "elysia";
import { OrganizationPlain } from "../prisma/generated/prismabox/Organization";

export const ORGANIZATION_CATEGORY = {
  CONSULTING: "Consulting",
  TECHNOLOGY: "technology",
  DESING: "Design & Creative",
} as const;

export const OrganizationAddress = t.Object({
  city: t.String(),
  cityCode: t.String(),
});

export const OrganizationRenforcedMetadata = t.Object(
  {
    // category: t.String({
    //   enum: Object.values(ORGANIZATION_CATEGORY),
    // }),
  },
  {
    additionalProperties: true,
  },
);

export const OrganizationRenforced = t.Intersect([
  t.Omit(OrganizationPlain, ["metadata"]),
  t.Object({ metadata: OrganizationRenforcedMetadata, _count: t.Record(t.String(), t.Any()) }),
]);
