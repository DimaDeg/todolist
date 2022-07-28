import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../../../app/bll/app-reducer";
import {todolistsAPI, TodolistType} from "../../../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../../../utils/error-utils";
import {changeTodolistEntityStatusAC} from "./todolists-reducer";
import {ThunkErrorType} from "../../../../app/bll/store";


// thunks
export const fetchTodolists = createAsyncThunk('todolist/fetchTodolists', async (param, {
    dispatch,
    rejectWithValue
}) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.getTodolists()
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(error.message)
    }
})

export const removeTodolist = createAsyncThunk('todolist/removeTodolist', async (todolistId: string, {
    dispatch,
    rejectWithValue
}) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.deleteTodolist(todolistId)
        if (res.data.resultCode === 0) {
            dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {id: todolistId}
        } else {
            dispatch(setAppStatusAC({status: 'failed'}))
            return rejectWithValue({errors: res.data.messages})
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(error.message)
    }
})

export const addTodolist = createAsyncThunk<TodolistType, string, ThunkErrorType>
('todolist/addTodolist', async (title, {
    dispatch, rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return res.data.data.item
        } else {
            dispatch(setAppStatusAC({status: 'failed'}))
            return rejectWithValue({errors: res.data.messages})
        }

    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(error.message)
    }
})

export const changeTodolistTitle = createAsyncThunk('todolist/changeTodolistTitle', async (param: { id: string, title: string },
                                                                                           {dispatch,rejectWithValue}) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.updateTodolist(param.id, param.title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return param
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({errors: res.data.messages})
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(error.message)
    }
})