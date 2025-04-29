import { db } from "@api/database";
import { todoTable } from "@api/database/schemas";
// import type { Repository } from "@api/interfaces/repository.interface";
import {
	type TodoInsertSchema,
	type TodoSelectSchema,
	type TodoUpdateSchema,
	todoSelectSchema,
} from "@api/modules/todo/todo.schema";
import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { eq } from "drizzle-orm";

// implements Repository<TodoSelectSchema, TodoInsertSchema, TodoUpdateSchema>
export class TodoRepository {
	public async find(): Promise<TodoSelectSchema[]> {
		const results = await db.query.todoTable.findMany();
		return Value.Parse(Type.Array(todoSelectSchema), results);
	}

	public async findById(id: string): Promise<TodoSelectSchema> {
		const results = db.query.todoTable.findFirst({
			where: (todo, { eq }) => eq(todo.id, id),
		});
		return Value.Parse(todoSelectSchema, results);
	}

	public async create(todo: TodoInsertSchema): Promise<TodoSelectSchema> {
		const [todoCreated] = await db.insert(todoTable).values(todo).returning();
		return Value.Parse(todoSelectSchema, todoCreated);
	}

	public async update({
		id,
		...todo
	}: TodoUpdateSchema): Promise<TodoSelectSchema> {
		const [todoUpdated] = await db
			.update(todoTable)
			.set(todo)
			.where(eq(todoTable.id, String(id)))
			.returning();
		return Value.Parse(todoSelectSchema, todoUpdated);
	}

	public async delete(id: string): Promise<TodoSelectSchema> {
		const [todoDeleted] = await db
			.delete(todoTable)
			.where(eq(todoTable.id, id))
			.returning();
		return Value.Parse(todoSelectSchema, todoDeleted);
	}
}
