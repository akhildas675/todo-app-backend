import express from 'express';
import { getTodos, addTodos, editTodos, deleteTodos, assignTask, getDashboard } from "../controllers/todoController.js";
import { protect } from "../middleware/middleware.js";

const todoRoute = express.Router();


todoRoute.get("/", protect, getTodos);
todoRoute.post("/", protect, addTodos);
todoRoute.put("/:id", protect, editTodos);
todoRoute.delete("/:id", protect, deleteTodos);

todoRoute.patch("/:id/assign", protect, assignTask);
todoRoute.get("/dashboard", protect, getDashboard);

export default todoRoute;