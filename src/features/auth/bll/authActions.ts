import {createAsyncThunk} from "@reduxjs/toolkit";
import {authAPI, LoginParamsType} from "../../../api/todolists-api";
import {setAppStatusAC} from "../../../app/bll/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";


//thunks
export const login = createAsyncThunk('auth/login', async (data: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            thunkAPI.dispatch(setAppStatusAC({status: 'failed'}))
            return thunkAPI.rejectWithValue({errors:res.data.messages,fieldsErrors:res.data.fieldsErrors})
        }
    }
    catch (error:any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        thunkAPI.dispatch(setAppStatusAC({status: 'failed'}))
        return thunkAPI.rejectWithValue({errors:[error.message],fieldsErrors:undefined})
    }
})

export const logout = createAsyncThunk('auth/logout',async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            thunkAPI.dispatch(setAppStatusAC({status: 'failed'}))
            return thunkAPI.rejectWithValue('')
        }
    }
    catch (error:any){
        handleServerNetworkError(error.data, thunkAPI.dispatch)
        thunkAPI.dispatch(setAppStatusAC({status: 'failed'}))
        return thunkAPI.rejectWithValue('')
    }
})