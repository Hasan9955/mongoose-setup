"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const todo_service_1 = require("./todo.service");
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const todoCreate = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield todo_service_1.TodoServices.createTodo(data);
    res.status(200).json({
        success: true,
        message: 'Todo created successfully.',
        data: result
    });
}));
const getTodos = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.priority;
    if (query) {
        const result = yield todo_service_1.TodoServices.getTodos(query);
        res.status(200).json({
            success: true,
            message: 'All todo retrieved successfully.',
            data: result
        });
    }
    else {
        const result = yield todo_service_1.TodoServices.getTodos();
        res.status(200).json({
            success: true,
            message: 'All todo retrieved successfully.',
            data: result
        });
    }
}));
const updateTodo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield todo_service_1.TodoServices.updateTodo(data, id);
    res.status(200).json({
        success: true,
        message: 'Todo updated successfully.',
        data: result
    });
}));
const deleteTodo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield todo_service_1.TodoServices.deleteTodo(id);
    res.status(200).json({
        success: true,
        message: 'Todo deleted successfully.',
        data: result
    });
}));
exports.TodoController = {
    todoCreate,
    getTodos,
    updateTodo,
    deleteTodo
};
