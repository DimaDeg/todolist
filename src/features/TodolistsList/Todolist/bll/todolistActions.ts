import {createAsyncThunk} from "@reduxjs/toolkit";
import {todolistsAPI} from "../../../../api/todolists-api";
import {todolistsActions} from "../../";
import {ThunkErrorType} from "../../../../app/bll/store";
import {TodolistType} from "../../../../api/types";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../../../utils/error-utils";
import {commonActions} from "../../../CommonActions/";

const {setAppStatus} = commonActions
// thunks
const fetchTodolists = createAsyncThunk<{ todolists: TodolistType[] }, undefined, ThunkErrorType>('todolist/fetchTodolists', async (param, thunkApi) => {
    thunkApi.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTodolists()
        thunkApi.dispatch(setAppStatus({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkApi)
    }
})

const removeTodolist = createAsyncThunk<{ id: string }, string, ThunkErrorType>('todolist/removeTodolist', async (todolistId: string, thunkApi) => {
    const {changeTodolistEntityStatus} = todolistsActions
    thunkApi.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.deleteTodolist(todolistId)
        if (res.data.resultCode === 0) {
            thunkApi.dispatch(changeTodolistEntityStatus({id: todolistId, status: 'loading'}))
            thunkApi.dispatch(setAppStatus({status: 'succeeded'}))
            return {id: todolistId}
        } else {
            return handleAsyncServerAppError(res.data, thunkApi)
        }
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkApi)
    }
})

const addTodolist = createAsyncThunk<{todolist:TodolistType}, string, ThunkErrorType>
('todolist/addTodolist', async (title, thunkApi) => {
    thunkApi.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            thunkApi.dispatch(setAppStatus({status: 'succeeded'}))
            return {todolist:res.data.data.item}
        } else {
            return handleAsyncServerAppError(res.data, thunkApi)
        }

    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkApi)
    }
})

const changeTodolistTitle = createAsyncThunk<{ id: string, title: string }, { id: string, title: string }, ThunkErrorType>('todolist/changeTodolistTitle', async (param, thunkApi) => {
    thunkApi.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.updateTodolist(param.id, param.title)
        if (res.data.resultCode === 0) {
            thunkApi.dispatch(setAppStatus({status: 'succeeded'}))
            return param
        } else {
            return handleAsyncServerAppError(res.data, thunkApi)
        }
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkApi)
    }
})
export const todolistsAsyncActions = {
    fetchTodolists, removeTodolist, addTodolist, changeTodolistTitle
}