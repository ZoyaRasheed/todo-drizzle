import express from 'express';
import {
  addTodo,
  updateTodo,
  deleteTodo,
  getAllTodos,
  searchTodos,
  toggleTodoStatus
} from '../controllers/todos.controller.js';


const router = express.Router();

router.get('/getTodos',getAllTodos);
router.post('/add',addTodo);
router.patch('/update/:id',updateTodo);
router.delete('/delete/:id',deleteTodo);
router.get('/search', searchTodos);
router.patch('/toggle/:id',toggleTodoStatus);

export default router;
