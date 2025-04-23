import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import logixlysia from "logixlysia";
import { betterAuth } from "../middleware/auth.middleware";


console.log("ENV",process.env.APP_ADMIN_ORIGIN);


const app = new Elysia()
	.use(betterAuth)
	.use(logixlysia())
	.use(
		cors({
			origin: [process.env.APP_ADMIN_ORIGIN],
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			credentials: true,
			allowedHeaders: ["Content-Type", "Authorization"],
		}),
	)
	.get("/user", ({ user }) => user, {
		auth: true,
	})
	.listen(Number.parseInt(process.env.AUTH_SERVER_PORT));
