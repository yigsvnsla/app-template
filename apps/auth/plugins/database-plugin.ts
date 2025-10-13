import { PrismaClient } from "@app/auth/prisma/generated/client";
import { prismaAdapter } from "better-auth/adapters/prisma";

const prisma = new PrismaClient();

export const databasePlugin = prismaAdapter(prisma, {
  provider: "sqlite",
});
