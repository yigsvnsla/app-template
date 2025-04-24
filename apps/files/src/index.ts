import cors from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import logixlysia from "logixlysia";
import { Todo } from "./todo";
import { upload } from "./upload";

const app = new Elysia()
	.use(upload)
	.use(Todo)

	.use(
		cors({
			origin: ["http://localhost:5173", "http://localhost:8888"],
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			credentials: true,
			allowedHeaders: ["Content-Type", "Authorization"],
		}),
	)
	.use(logixlysia())
	.use(staticPlugin())
	.use(swagger())
	.get("/", () => "Hello Elysia")
	.listen(4343);
