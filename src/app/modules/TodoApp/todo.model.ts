import { Schema, model } from 'mongoose';
import { TTodo } from './todo.interface'; 


const TodoSchema = new Schema<TTodo>({
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
})


export const TodoModel = model<TTodo>('todos', TodoSchema);