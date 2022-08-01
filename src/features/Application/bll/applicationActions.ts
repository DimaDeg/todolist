import {createAsyncThunk} from "@reduxjs/toolkit";
import {authAPI} from "../../../api/todolists-api";
import {setIsLoggedIn} from "../../auth/bll/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {slice} from "./application-reducer";


export const initializeApp = createAsyncThunk('application/initializeApp', async (param, {dispatch}) => {
    dispatch(slice.actions.setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({value: true}));
            dispatch(slice.actions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
            dispatch(slice.actions.setAppStatus({status: 'failed'}))
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        dispatch(slice.actions.setAppStatus({status: 'failed'}))
    }
})