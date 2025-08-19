import express from "express";
import { getTodos, addTodos, editTodos, deleteTodos } from "../controllers/todoController.js";
import { protect } from "../middleware/middleware.js";

const todoRoute = express.Router();


todoRoute.use(protect);


todoRoute.get('/', getTodos);
todoRoute.post('/', addTodos);
todoRoute.put('/:id', editTodos);
todoRoute.delete('/:id', deleteTodos);

export default todoRoute;