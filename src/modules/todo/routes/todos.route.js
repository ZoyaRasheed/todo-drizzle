import express from 'express'
import {
addTodo,
updateTodo,
deleteTodo,
getAllTodos
} from '../controllers/todos.controller.js'


const router = express.Router();

router.get('/getTodos',getAllTodos)
router.post('/add',addTodo)
router.patch('/update/:id',updateTodo)
router.delete('/delete/:id',deleteTodo)
// router.delete('/delete/:id',)
// router.get('/display',)

export default router;