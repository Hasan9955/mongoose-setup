import { TodoServices } from './todo.service';
import catchAsync from "../../utility/catchAsync";


const todoCreate = catchAsync(async (req, res) =>{
    const data = req.body;

    const result = await TodoServices.createTodo(data)

    res.status(200).json({
        success: true,
        message: 'Todo created successfully.',
        data: result
    })
})



const getTodos = catchAsync( async(req, res) =>{
    const query = req.query.priority
    
    
    if(query){
        const result = await TodoServices.getTodos(query as string)
        res.status(200).json({
            success: true,
            message: 'All todo retrieved successfully.',
            data: result
        })
    }else{
        const result = await TodoServices.getTodos();
        res.status(200).json({
            success: true,
            message: 'All todo retrieved successfully.',
            data: result
        })
    }
})


const updateTodo = catchAsync(async(req, res) =>{
    const id = req.params.id;
    const data = req.body;

    const result = await TodoServices.updateTodo(data, id);
    res.status(200).json({
        success: true,
        message: 'Todo updated successfully.',
        data: result
    })
})

const deleteTodo = catchAsync(async(req, res) =>{
    const id = req.params.id;
    const result = await TodoServices.deleteTodo(id)

    res.status(200).json({
        success: true,
        message: 'Todo deleted successfully.',
        data: result
    })
})


export const TodoController = {
    todoCreate,
    getTodos,
    updateTodo,
    deleteTodo
}