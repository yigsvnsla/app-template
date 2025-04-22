// TODO: CUANDO LO ARREGLEN MIGRAR A UN CLIENTE UNIFICADO
// ! SE TIENE QUE USAR OTRO CLIENTE PORQUE LOS MANTENEDORES DE kysely-libsql SON UNA VERGA

import { join } from "node:path";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import { Kysely } from "kysely";
import type { DB } from "../database/better-auth-db";
// https://github.com/tursodatabase/kysely-libsql/issues/12

console.log();

export const BetterAuthDbClient = new Kysely<DB>({
	dialect: new LibsqlDialect({
		url: `file:${join(__dirname, "..", "/database/better-auth.sqlite")}`,
	}),
});

export async function findUser(id: string) {
	return await BetterAuthDbClient.selectFrom("user")
		.selectAll()
		.where("id", "=", id)
		.executeTakeFirstOrThrow();
}

// console.log(await findUser("kiT71kZPCyFOefHbvI4eZ9fqCKDQ2uGY"));
