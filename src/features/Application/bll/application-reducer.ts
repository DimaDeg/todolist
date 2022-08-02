import {createSlice} from "@reduxjs/toolkit";
import {initializeApp} from "./applicationActions";
import {commonActions} from "../../CommonActions/";


export const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false
    } as InitialStateType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(initializeApp.fulfilled, (state) => {
            state.isInitialized = true
        })
            .addCase(commonActions.setAppStatus, (state, action) => {
                state.status = action.payload.status
            })
            .addCase(commonActions.setAppError, (state, action) => {
                state.error = action.payload.error
            })
    }
})

export const applicationReducer = slice.reducer;


//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
}
