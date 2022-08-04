import {AppRootStateType} from "./types";

//app
export const selectStatus = (state:AppRootStateType) => state.app.status;

export const selectIsInitialized = (state:AppRootStateType) => state.app.isInitialized;

//auth
export const selectIsLoggedIn = (state:AppRootStateType) => state.auth.isLoggedIn;
