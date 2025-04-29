import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todoTable = sqliteTable("todos", {
	id: text("id").unique().primaryKey().notNull(),
	title: text("title").notNull(),
	complete: integer("complete", { mode: "boolean" }).default(false),
});

