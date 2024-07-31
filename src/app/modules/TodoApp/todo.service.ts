import { TodoModel } from './todo.model';
import { TTodo } from './todo.interface';
import AppError from '../../Errors/AppError';
import { merge } from 'lodash';


const createTodo = async (data: TTodo) => {
    const result = await TodoModel.create(data)

    return result;
}


const getTodos = async (query?: string) => {
    if (query) {
        const result = await TodoModel.find({
            priority: query
        })
        return result
    } else {
        const result = await TodoModel.find();

        return result;
    }


}

const updateTodo = async (data: TTodo, id: string) => {
    const getTodo = await TodoModel.findOne({ id })

    if (!getTodo) {
        return new AppError(400, 'Todo not found.')
    }

    const mergedTodo = merge(getTodo, data)
    const result = await TodoModel.updateOne(
        { id },
        mergedTodo
    );

    return result;
}


const deleteTodo = async (id: string) => {
    const result = await TodoModel.deleteOne({ id });

    return result;
}


export const TodoServices = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
}