import { type Config, defineConfig } from "drizzle-kit";

const config: Config = {
	out: "./drizzle",
	schema: "./src/database/schemas/*",
	dialect: "sqlite",
	dbCredentials: {
		url: process.env.DATABASE_URL ?? "",
	},
};

export default defineConfig(config);
