import {
  httpResponse,
  responseMessage,
  httpError,
  asyncHandler,
} from '../../../shared/index.js';
import db from '../../../config/db/index.js';
import { todoItemsTable } from '../../../config/db/schema.js';
import { eq } from 'drizzle-orm';

// Get all the Todo items
const getAllTodos = asyncHandler(async (req, res) => {
  const todos = await db
    .select({
      id: todoItemsTable.id,
      title: todoItemsTable.title,
      descrption: todoItemsTable.description,
    })
    .from(todoItemsTable);

  return httpResponse(req, res, 200, responseMessage.SUCCESS.DEFAULT, {
    todos,
  });
});

// Add the items in todo List
const addTodo = asyncHandler(async (req, res) => {
  const { description } = req.body;
  if (!description) {
    return httpError(req, res, new Error(responseMessage.ERROR.BAD_REQUEST),400);
  }
  const [todos] = await db
    .insert(todoItemsTable)
    .values({
      description,
    })
    .returning({
      id: todoItemsTable.id,
    });
  return httpResponse(req, res, 201, responseMessage.SUCCESS.CREATED, {
    id: todos.id,
    todoItem: description,
  });
});

// Update the items in todolist
const updateTodo = asyncHandler(async (req, res) => {
  const { newDescription } = req.body;
  const id = req.params.id;

  if (!id) {
    return httpError(
      req,
      res,
      new Error(
        responseMessage.custom('Please select the item to update first')
      ),400
    );
  }

  if (!newDescription) {
    return httpError(
      req,
      res,
      new Error(responseMessage.custom('Please add the new todo item '),400)
    );
  }
  const [oldDescription] = await db
    .select({
      description: todoItemsTable.description,
    })
    .from(todoItemsTable)
    .where(eq(todoItemsTable.id, id));

  const [updatedTodo] = await db
    .update(todoItemsTable)
    .set({ description: newDescription })
    .where(eq(todoItemsTable.id, id))
    .returning({
      description: todoItemsTable.description,
    });

  return httpResponse(req, res, 200, responseMessage.SUCCESS.UPDATED, {
    updatedTodoDescription: updatedTodo.description,
    oldDescription: oldDescription.description,
    updatedTodoId: id,
  });
});

// Delete the items in todoList
const deleteTodo = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return httpError(
      req,
      res,
      new Error(
        responseMessage.custom('Please select the item to delete first')
      ),400
    );
  }
  const [deleteTodo] = await db
    .delete(todoItemsTable)
    .where(eq(todoItemsTable.id, id))
    .returning({
      descrption: todoItemsTable.description,
    });

  return httpResponse(req, res, 200, responseMessage.SUCCESS.DELETED, {
    message: ` Deleted the item of this descritpion ${deleteTodo.descrption}`,
  });
});

// Search the items in todoList 
const searchTodos = asyncHandler(async (req, res) => {
  const { search } = req.query;

  if (!search) {
    return httpError(req, res, new Error("Search  is required"));
  }

  const todos = await db
    .select({
      id: todoItemsTable.id,
      title: todoItemsTable.title,
      description: todoItemsTable.description,
    })
    .from(todoItemsTable)
    .where(todoItemsTable.description.like(`%${search}%`));

  return httpResponse(req, res, 200, responseMessage.SUCCESS.DEFAULT, todos,);
});


export { addTodo, updateTodo, deleteTodo, getAllTodos, searchTodos };
