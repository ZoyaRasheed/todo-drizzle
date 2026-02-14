import { pgTable, uuid, text} from "drizzle-orm/pg-core";

export const todoItemsTable = pgTable('todo-items',{
    id: uuid().primaryKey().defaultRandom(),
    title : text(),
    description : text().notNull()
})
