"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoModel = void 0;
const mongoose_1 = require("mongoose");
const TodoSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    },
    priority: {
        type: String,
        required: true
    }
});
exports.TodoModel = (0, mongoose_1.model)('todos', TodoSchema);
