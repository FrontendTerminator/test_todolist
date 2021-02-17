import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: "CHANGE-STATUS"
    TaskId: string
    isDone: boolean
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: "CHANGE-TITLE"
    TaskId: string
    title: string
    todolistId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType |
    ChangeTaskStatusActionType | ChangeTaskTitleActionType |
    AddTodolistActionType | RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case "CHANGE-STATUS": {
            let todoListTasks = state[action.todolistId]
            state[action.todolistId] = todoListTasks.map(t => t.id === action.TaskId
            ? {...t, isDone: action.isDone}
            : t)
            return ({...state})
        }
        case "CHANGE-TITLE":{
            let todoListTasks = state[action.todolistId]
            state[action.todolistId] = todoListTasks.map(t => t.id === action.TaskId
                ? {...t, title: action.title}
                : t)
            return ({...state})
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST":{
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType =>{
    return {type: "REMOVE-TASK", todolistId, taskId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType =>{
    return {type: "ADD-TASK", title, todolistId}
}
export const changeTaskStatusAC = (TaskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType =>{
    return {type: "CHANGE-STATUS", TaskId, isDone, todolistId}
}
export const changeTaskTitleAC = (TaskId: string, title: string, todolistId: string): ChangeTaskTitleActionType =>{
    return {type: "CHANGE-TITLE", TaskId, title, todolistId}
}



