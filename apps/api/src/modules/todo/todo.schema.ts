import { paginationQuerySchema } from '@api/common/schemas/pagination.schema';
import { todoTableSchema } from '@api/database/schemas';
import { asc } from 'drizzle-orm';
import { createSchemaFactory } from 'drizzle-typebox';
import { type Static, t } from 'elysia';

const schemaFactory = createSchemaFactory({
  typeboxInstance: t,
});

export const todoSelectSchema =
  schemaFactory.createSelectSchema(todoTableSchema);
export const todoInsertSchema = schemaFactory.createInsertSchema(
  todoTableSchema,
  {
    title: (schema) => t.String({ ...schema, minLength: 1, maxLength: 100 }),
  },
);

export const todoUpdateSchema =
  schemaFactory.createUpdateSchema(todoTableSchema);

export type TodoSelectSchema = typeof todoSelectSchema.static;
export type TodoInsertSchema = typeof todoInsertSchema.static;
export type TodoUpdateSchema = typeof todoUpdateSchema.static;

export const createTodoSchema = t.Omit(todoInsertSchema, ['id', 'complete']);
export type CreateTodoSchema = typeof createTodoSchema.static;

export const TodoSchema = todoSelectSchema;
export type Todo = TodoSelectSchema;

export const todoPaginationRepositorySchema = paginationQuerySchema;
export const todoPaginationOrderRepositorySchema =  