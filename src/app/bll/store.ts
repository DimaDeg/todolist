import {combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from './app-reducer'
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {authReducer} from "../../features/auth";
import {tasksReducer, todolistsReducer} from "../../features/TodolistsList";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
// непосредственно создаём store
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<RootReducerType>
export type RootReducerType = typeof rootReducer
// @ts-ignore
window.store = store;

export type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()

export type ThunkErrorType = {rejectValue:{errors:string[],fieldsErrors?:string[]| undefined}}