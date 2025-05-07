import { randomUUIDv7 } from 'bun';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const todoTableSchema = sqliteTable('todos', {
  id: text('id').unique().primaryKey().notNull().$defaultFn(randomUUIDv7),
  title: text('title').notNull(),
  complete: integer('complete', { mode: 'boolean' }).default(false).notNull(),
});
