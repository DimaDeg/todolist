import {createAsyncThunk} from "@reduxjs/toolkit";
import {authAPI} from "../../../api/todolists-api";
import {setIsLoggedIn} from "../../auth/bll/auth-reducer";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../../utils/error-utils";
import {commonActions} from "../../CommonActions/";


export const initializeApp = createAsyncThunk('application/initializeApp', async (param, thunkApi) => {
    thunkApi.dispatch(commonActions.setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            thunkApi.dispatch(setIsLoggedIn({value: true}));
            thunkApi.dispatch(commonActions.setAppStatus({status: 'succeeded'}))
        } else {
            return handleAsyncServerAppError(res.data, thunkApi)
        }
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkApi)
    }
})