import {createAsyncThunk} from "@reduxjs/toolkit";
import {todolistsAPI} from "../../../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../../../utils/error-utils";
import {AppRootStateType, ThunkErrorType} from "../../../../app/bll/store";
import {UpdateDomainTaskModelType} from "./tasks-reducer";
import { appActions } from "../../../Application";
import { TaskType, UpdateTaskModelType } from "../../../../api/types";

const {setAppStatus} = appActions

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, {dispatch,rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTasks(todolistId);
        const tasks = res.data.items
        dispatch(setAppStatus({status: 'succeeded'}))
        return {tasks, todolistId}
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
        return rejectWithValue({errors: error.messages})
    }

});

export const removeTask = createAsyncThunk('tasks/removeTask', async (param: { taskId: string, todolistId: string }, {dispatch,rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.deleteTask(param.todolistId, param.taskId)
        if(res.data.resultCode === 0){
            dispatch(setAppStatus({status: 'succeeded'}))
            return {taskId: param.taskId, todolistId: param.todolistId}
        } else {
            dispatch(setAppStatus({status: 'failed'}))
            return rejectWithValue({errors: res.data.messages, fieldsErrors: undefined})
        }

    }catch (error: any) {
        handleServerNetworkError(error, dispatch);
        return rejectWithValue({errors: error.messages})
    }

});

export const addTask = createAsyncThunk<TaskType, { title: string, todolistId: string }, ThunkErrorType>
('tasks/addTask', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTask(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return res.data.data.item
        } else {
            dispatch(setAppStatus({status: 'failed'}))
            return rejectWithValue({errors: res.data.messages, fieldsErrors: undefined})
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
        return rejectWithValue({errors: error.messages})
    }
})

export const updateTask = createAsyncThunk('tasks/updateTask', async (param: { taskId: string, model: UpdateDomainTaskModelType, todolistId: string },
                                                                      {dispatch, getState, rejectWithValue}) => {
    const state = getState() as AppRootStateType;
    const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
    if (!task) {
        return rejectWithValue('task not found in the state')
    }
    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...param.model
    }
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return param
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue({errors: res.data.messages, fieldsErrors: undefined})
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
        return rejectWithValue({errors: error.messages})
    }
});