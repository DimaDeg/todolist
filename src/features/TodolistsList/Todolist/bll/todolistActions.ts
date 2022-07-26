import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../../../app/bll/app-reducer";
import {todolistsAPI} from "../../../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../../../utils/error-utils";
import {changeTodolistEntityStatusAC} from "./todolists-reducer";


// thunks
export const fetchTodolists = createAsyncThunk('todolist/fetchTodolists', async (param, {dispatch}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.getTodolists()
    dispatch(setAppStatusAC({status: 'succeeded'}))
    return {todolists: res.data}
})

export const removeTodolist = createAsyncThunk('todolist/removeTodolist', async (todolistId: string, {dispatch}) => {
    //изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    await todolistsAPI.deleteTodolist(todolistId)
    //скажем глобально приложению, что асинхронная операция завершена
    dispatch(setAppStatusAC({status: 'succeeded'}))
    return {id: todolistId}
})
export const addTodolist = createAsyncThunk('todolist/addTodolist', async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return res.data.data.item
        } else {
            handleServerAppError(res.data, dispatch);
            dispatch(setAppStatusAC({status: 'failed'}))
            return rejectWithValue(null)
        }

    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        dispatch(setAppStatusAC({status: 'failed'}))
        return rejectWithValue(null)
    }
})
export const changeTodolistTitle = createAsyncThunk('todolist/changeTodolistTitle', async (param: { id: string, title: string }, {dispatch}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    await todolistsAPI.updateTodolist(param.id, param.title)
    dispatch(setAppStatusAC({status: 'succeeded'}))
    return param
})