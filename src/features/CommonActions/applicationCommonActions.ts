import {createAction} from "@reduxjs/toolkit";
import {RequestStatusType} from "../Application/bll/application-reducer";

const setAppStatus = createAction<{ status: RequestStatusType }>('app/setAppStatus')

const setAppError = createAction<{ error: string | null }>('app/setAppError')

export const commonActions = {
    setAppStatus,
    setAppError
}