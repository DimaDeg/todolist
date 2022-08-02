import {createAsyncThunk} from "@reduxjs/toolkit";
import {authAPI} from "../../../api/todolists-api";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../../utils/error-utils";
import {commonActions} from "../../CommonActions";
import {LoginParamsType} from "../../../api/types";

const {setAppStatus} = commonActions
//thunks
export const login = createAsyncThunk('auth/login', async (data: LoginParamsType, thunkAPI) => {

    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            return handleAsyncServerAppError(res.data,thunkAPI)

        }
    }
    catch (error:any) {
        return handleAsyncServerAppError(error,thunkAPI)
    }
})

export const logout = createAsyncThunk('auth/logout',async (param, thunkAPI) => {

    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    }
    catch (error:any){
        return handleAsyncServerNetworkError(error,thunkAPI)
    }
})