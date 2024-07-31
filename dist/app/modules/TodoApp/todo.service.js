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
exports.TodoServices = void 0;
const todo_model_1 = require("./todo.model");
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const lodash_1 = require("lodash");
const createTodo = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield todo_model_1.TodoModel.create(data);
    return result;
});
const getTodos = (query) => __awaiter(void 0, void 0, void 0, function* () {
    if (query) {
        const result = yield todo_model_1.TodoModel.find({
            priority: query
        });
        return result;
    }
    else {
        const result = yield todo_model_1.TodoModel.find();
        return result;
    }
});
const updateTodo = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const getTodo = yield todo_model_1.TodoModel.findOne({ id });
    if (!getTodo) {
        return new AppError_1.default(400, 'Todo not found.');
    }
    const mergedTodo = (0, lodash_1.merge)(getTodo, data);
    const result = yield todo_model_1.TodoModel.updateOne({ id }, mergedTodo);
    return result;
});
const deleteTodo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield todo_model_1.TodoModel.deleteOne({ id });
    return result;
});
exports.TodoServices = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
};
