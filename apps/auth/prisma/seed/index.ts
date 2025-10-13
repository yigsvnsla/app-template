import { auth } from "@app/auth/utils/auth";
import { PrismaClient } from "../generated/client";
import { fakeAccountComplete, fakeSessionComplete, fakeUserComplete } from "../generated/faker";

async function main(prisma: PrismaClient) {
  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { ...fakeUserComplete() },
      });

      const account = await tx.account.create({
        data: {
          ...fakeAccountComplete(),
          userId: user.id,
          password: (await (await auth.$context).password.hash("123456789")).split(":")[1],
          providerId: "credential",
        },
      });

      const session = await tx.session.create({
        data: {
          ...fakeSessionComplete(),
          userId: user.id,
        },
      });

      console.log("🧾 Datos generados:");
      console.log({ user, account, session });
    });
  } catch (err) {
    if (err instanceof Error && err.message === "Transacción cancelada manualmente") {
      console.log("🌀 Rollback exitoso. No se guardó nada en la BD.");
    } else {
      console.error("💥 Error inesperado:", err);
    }
  } finally {
    await prisma.$disconnect();
  }
}

if (import.meta.main) {
  const prisma = new PrismaClient();

  main(prisma)
    .then(async () => {
      console.log("Seeding finished.");
      await prisma.$disconnect();
      process.exit(0);
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}
