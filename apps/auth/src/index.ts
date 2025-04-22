import { cors } from "@elysiajs/cors";
import type { auth } from "@package/better-auth/auth";
import {
	BetterAuthDbClient,
	findUser,
} from "@package/better-auth/helpers/client-sql";
import { getEnvArray } from "@package/better-auth/helpers/env";
import { Elysia, t } from "elysia";
import logixlysia from "logixlysia";
import { betterAuth } from "../middleware/auth.middleware";

const app = new Elysia()
	.use(
		logixlysia({
			config: {
				ip: true,
			},
		}),
	)
	.use(betterAuth)
	.use(
		cors({
			origin: getEnvArray("BETTER_AUTH_TRUSTED_ORIGINS"),
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			credentials: true,
			allowedHeaders: ["Content-Type", "Authorization"],
		}),
	)
	.get(
		"/user",
		({
			user,
		}: {
			user: typeof auth.$Infer.Session.user;
		}) => user,
		{
			auth: true,
		},
	)

	.listen(Number(process.env.AUTH_SERVER_PORT));
