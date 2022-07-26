import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { login, logout } from "./authActions";


export const slice = createSlice({
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
        builder.addCase(login.fulfilled, (state) => {
            state.isLoggedIn = true
        });
        builder.addCase(logout.fulfilled,(state)=>{
            state.isLoggedIn = false
        })
    }
})

export const authReducer = slice.reducer;

export const {setIsLoggedInAC} = slice.actions;

// thunks

