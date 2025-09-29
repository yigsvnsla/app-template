import { PrismaClient } from "@app/auth/prisma/generated/client";
import {
  OrganizationRenforced,
  OrganizationRenforcedMetadata,
} from "@app/auth/schemas/organization-schema";
import { RequestDto } from "@app/auth/schemas/request-schema";
import { middleware } from "@app/auth/utils/middleware";
import { paginationHandler } from "@app/auth/utils/pagination";
import { metadataHandler, responseHandler } from "@app/auth/utils/response";
import Elysia, { StatusMap, t } from "elysia";
import Value from "typebox/value";

type InvitationStatus = "pending" | "accepted" | "rejected" | "canceled"; //! TIPADO TEMPORAL, USAR PRISMABOX

export const organizationModule = new Elysia({
  tags: ["Organization"],
  prefix: "/auth/api",
})
  .use(middleware)
  .get("/organization/stadistics", async () => {
    const prisma = new PrismaClient();

    // authClient.$Infer.Invitation.status

    const organizationCount = await prisma.organization.count();
    const membersCount = await prisma.member.count();
    const ivitationsCount = await prisma.invitation.count({
      where: {
        status: "pending" as InvitationStatus,
      },
    });

    return {
      organizations: organizationCount,
      members: membersCount,
      invitations: ivitationsCount,
    };
  })
  .get(
    "/organization/list_renforced/:id",
    async ({ params }) => {
      const prisma = new PrismaClient();

      const organization = await prisma.organization.findUnique({
        where: {
          id: params.id,
        },
        include: {
          _count: {
            select: {
              members: true,
              invitations: true,
              teams: true,
            },
          },
        },
      });

      return organization;
    },
    {},
  )
  .get(
    "/organization/list-renforced",
    async ({ query: { limit, offset } }) => {
      const prisma = new PrismaClient();

      const organizations = await prisma.organization.findMany({
        take: limit,
        skip: offset - 1,

        include: {
          _count: {
            select: {
              members: true,
              invitations: true,
              teams: true,
            },
          },
        },
      });

      console.log({ length: organizations.length }, { limit, offset });

      const organizationsMaped = organizations.map(({ _count, ...org }) => ({
        ...org,
        metadata: Value.Parse(OrganizationRenforcedMetadata, JSON.parse(org.metadata ?? "{}")),
        _count,
      }));

      const organizationCount = await prisma.organization.count();

      const pagination = paginationHandler(offset, limit, organizationCount);
      const metadata = metadataHandler(StatusMap.OK, pagination);
      const response = responseHandler(organizationsMaped, metadata);

      return response;
    },
    {
      auth: true,
      query: RequestDto(OrganizationRenforced),
      // response: {
      //   [StatusMap.OK]: ResponseDto(t.Array(OrganizationRenforced)),
      //   [StatusMap["Not Found"]]: t.Object({
      //     error: t.String(),
      //   }),
      // },
    },
  );
