import {setAppStatusAC,} from './app-reducer'
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


//thunks
export const loginTC = createAsyncThunk('auth/login', async (data: LoginParamsType, thunkAPI) => {
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

export const logoutTC = createAsyncThunk('auth/logout',async (param,thunkAPI) => {
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

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isLoggedIn = action.payload.value;
        }
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state) => {
            state.isLoggedIn = true
        });
        builder.addCase(logoutTC.fulfilled,(state)=>{
            state.isLoggedIn = false
        })
    }
})

export const authReducer = slice.reducer;

export const {setIsLoggedInAC} = slice.actions;

// thunks

