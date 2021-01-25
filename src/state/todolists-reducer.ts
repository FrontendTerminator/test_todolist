import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
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
                id: v1(),
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
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType =>{
    return {type: "REMOVE-TODOLIST", id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType =>{
    return {type: "ADD-TODOLIST", title: title}
}
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTitleTodolistActionType =>{
    return {type: "CHANGE-TODOLIST-TITLE", id: id,title: title}
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeFilterTodolistActionType =>{
    return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}
}

