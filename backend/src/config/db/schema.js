import { pgTable, uuid, varchar, text, pgEnum } from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', ['pending', 'completed']);

export const todoItemsTable = pgTable('todo-items', {
  id: uuid().defaultRandom().primaryKey(),
  title: varchar({ length: 255 }),
  description: text().notNull(),
  status: statusEnum().default('pending').notNull(),
});

