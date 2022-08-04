import {combineReducers} from "redux";
import {tasksReducer, todolistsReducer} from "../../features/TodolistsList";
import {appReducer} from "../../features/Application";
import {authReducer} from "../../features/auth";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})