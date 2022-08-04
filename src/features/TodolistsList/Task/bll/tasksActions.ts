import {createAsyncThunk} from "@reduxjs/toolkit";
import {todolistsAPI} from "../../../../api/todolists-api";
import {UpdateDomainTaskModelType} from "./tasks-reducer";
import {commonActions} from "../../../CommonActions";
import {TaskType, UpdateTaskModelType} from "../../../../api/types";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../../../utils/error-utils";
import {AppRootStateType, ThunkErrorType} from "../../../../app/bll/types";

const {setAppStatus} = commonActions

export const fetchTasks = createAsyncThunk<{tasks:TaskType[],todolistId:string},string,ThunkErrorType>
('tasks/fetchTasks', async (todolistId: string,thunkApi) => {
    thunkApi.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTasks(todolistId);
        const tasks = res.data.items
        thunkApi.dispatch(setAppStatus({status: 'succeeded'}))
        return {tasks, todolistId}
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkApi);
    }

});

export const removeTask = createAsyncThunk<{ taskId: string, todolistId: string },{ taskId: string, todolistId: string },ThunkErrorType>
('tasks/removeTask', async (param, thunkApi) => {
    thunkApi.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.deleteTask(param.todolistId, param.taskId)
        if(res.data.resultCode === 0){
            thunkApi.dispatch(setAppStatus({status: 'succeeded'}))
            return {taskId: param.taskId, todolistId: param.todolistId}
        } else {
            return handleAsyncServerAppError(res.data,thunkApi)
        }

    }catch (error: any) {
        return handleAsyncServerNetworkError(error,thunkApi)
    }
});

export const addTask = createAsyncThunk<TaskType, { title: string, todolistId: string }, ThunkErrorType>
('tasks/addTask', async (param, thunkApi) => {
    thunkApi.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTask(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            thunkApi.dispatch(setAppStatus({status: 'succeeded'}))
            return res.data.data.item
        } else {
            return handleAsyncServerAppError(res.data,thunkApi,false)
        }
    } catch (error: any) {
        return handleAsyncServerNetworkError(error,thunkApi,false)
    }
})

export const updateTask = createAsyncThunk<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string },
    { taskId: string, model: UpdateDomainTaskModelType, todolistId: string },ThunkErrorType>
('tasks/updateTask', async (param,thunkApi) => {
    const state = thunkApi.getState() as AppRootStateType;
    const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
    if (!task) {
        return thunkApi.rejectWithValue({errors:['task not found in the state']})
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
    thunkApi.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)
        if (res.data.resultCode === 0) {
            thunkApi.dispatch(setAppStatus({status: 'succeeded'}))
            return param
        } else {
            return handleAsyncServerAppError(res.data,thunkApi,false)
        }
    } catch (error: any) {
        return handleAsyncServerNetworkError(error,thunkApi,false)
    }
});