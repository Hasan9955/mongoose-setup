import { Router } from "express";
import { TodoController } from "./todo.controller";


const route = Router();

route.get('/', TodoController.getTodos)

route.post('/create-todo', TodoController.todoCreate)

route.put('/update-todo/:id', TodoController.updateTodo)

route.delete('/delete-todo/:id', TodoController.deleteTodo)


export const todoRoutes = route;