import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
type ChangeTitleTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeFilterTodolistActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTitleTodolistActionType | ChangeFilterTodolistActionType

export const todoListsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            return [...state, {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }]
        case 'CHANGE-TODOLIST-TITLE':
            let newState = [...state]
            let todoList = newState.find(tl => tl.id === action.id)
            if (todoList) todoList.title = action.title
            return newState
        case 'CHANGE-TODOLIST-FILTER': {
            let newState = [...state]
            let todoList = newState.find(tl => tl.id === action.id)
            if (todoList) todoList.filter = action.filter
            return newState
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType =>{
    return {type: "REMOVE-TODOLIST", id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType =>{
    return {type: "ADD-TODOLIST", title, todolistId: v1()}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTitleTodolistActionType =>{
    return {type: "CHANGE-TODOLIST-TITLE", id: id,title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeFilterTodolistActionType =>{
    return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}
}

