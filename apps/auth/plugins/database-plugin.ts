import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../prisma/generated/client";

const prisma = new PrismaClient();

export const databasePlugin = prismaAdapter(prisma, {
  provider: "sqlite",
})