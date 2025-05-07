import { db } from '@api/database';
import { todoTableSchema } from '@api/database/schemas';
import type {
  TodoInsertSchema,
  TodoUpdateSchema,
  todoPaginationRepositorySchema,
} from '@api/modules/todo/todo.schema';

import { eq } from 'drizzle-orm';
import type { Static } from 'elysia';
// ReturnType<typeof paginationQuerySchema<typeof todoSelectSchema>>
export class TodoRepository {
  public async find(
    pagination: Static<typeof todoPaginationRepositorySchema>,
    order,
  ) {
    return db.query.todoTableSchema.findMany({
      orderBy: (table, { desc }) => desc(table.id),
      limit: pagination.take,
      offset: (pagination.page - 1) * pagination.take,
    });
  }

  public async findById(id: string) {
    return db.query.todoTableSchema.findFirst({
      where: (todo, { eq }) => eq(todo.id, id),
    });
  }

  public async create(todos: TodoInsertSchema[]) {
    return db.insert(todoTableSchema).values(todos).returning();
  }

  public async update(todos: TodoUpdateSchema[]) {
    return db.transaction(async (trx) =>
      (
        await Promise.all(
          todos.map((todo) =>
            trx
              .update(todoTableSchema)
              .set(todo)
              .where(eq(todoTableSchema.id, String(todo.id)))
              .returning(),
          ),
        )
      ).flat(),
    );
  }

  public async delete(id: string) {
    const [todoDeleted] = await db
      .delete(todoTableSchema)
      .where(eq(todoTableSchema.id, id))
      .returning();
  }
}
