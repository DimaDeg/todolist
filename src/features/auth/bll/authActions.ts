import {createAsyncThunk} from "@reduxjs/toolkit";
import {authAPI} from "../../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import { appActions } from "../../Application";
import {LoginParamsType} from "../../../api/types";



//thunks
export const login = createAsyncThunk('auth/login', async (data: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            thunkAPI.dispatch(appActions.setAppStatus({status: 'failed'}))
            return thunkAPI.rejectWithValue({errors:res.data,fieldsErrors:res.data.fieldsErrors})
        }
    }
    catch (error:any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        thunkAPI.dispatch(appActions.setAppStatus({status: 'failed'}))
        return thunkAPI.rejectWithValue({errors:[error.message],fieldsErrors:undefined})
    }
})

export const logout = createAsyncThunk('auth/logout',async (param, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            thunkAPI.dispatch(appActions.setAppStatus({status: 'failed'}))
            return thunkAPI.rejectWithValue('')
        }
    }
    catch (error:any){
        handleServerNetworkError(error.data, thunkAPI.dispatch)
        thunkAPI.dispatch(appActions.setAppStatus({status: 'failed'}))
        return thunkAPI.rejectWithValue('')
    }
})