import { Elysia } from "elysia";
import { betterAuth } from "../middleware/auth.middleware";

const app = new Elysia()
	.use(betterAuth)
	.get("/user", ({ user }) => user, {
		auth: true,
	})
	.listen(8888);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
