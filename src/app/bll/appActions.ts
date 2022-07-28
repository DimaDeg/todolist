import {createAsyncThunk} from "@reduxjs/toolkit";
import {authAPI} from "../../api/todolists-api";
import {setIsLoggedInAC} from "../../features/auth/bll/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {setAppStatusAC} from "./app-reducer";

export const initializeApp = createAsyncThunk('app/initializeApp', async (param, {dispatch}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
            dispatch(setAppStatusAC({status: 'failed'}))
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        dispatch(setAppStatusAC({status: 'failed'}))
    }
})