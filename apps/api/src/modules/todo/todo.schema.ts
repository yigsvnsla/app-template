import { todoTable } from "@api/database/schemas";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-typebox";

export const todoSelectSchema = createSelectSchema(todoTable);
export const todoInsertSchema = createInsertSchema(todoTable);
export const todoUpdateSchema = createUpdateSchema(todoTable);

export type TodoSelectSchema = typeof todoSelectSchema.static;
export type TodoInsertSchema = typeof todoInsertSchema.static;
export type TodoUpdateSchema = typeof todoUpdateSchema.static;
