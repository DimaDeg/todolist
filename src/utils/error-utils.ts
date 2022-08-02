import {ResponseType} from '../api/types'
import {commonActions} from '../features/CommonActions'

type ThunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}
const {setAppStatus, setAppError} = commonActions

export const handleAsyncServerAppError = <D>(data: ResponseType<D>, ThunkApi: ThunkAPIType, showError = true) => {
    if (showError) {
        ThunkApi.dispatch(setAppError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
    ThunkApi.dispatch(setAppStatus({status: 'failed'}))
    return ThunkApi.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
}

export const handleAsyncServerNetworkError = (error: { message: string }, ThunkApi: ThunkAPIType, showError = true) => {

    if(showError){
        ThunkApi.dispatch(setAppError({error: error.message ? error.message : 'Some error occurred'}))
    }
    ThunkApi.dispatch(setAppStatus({status: 'failed'}))
    return ThunkApi.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
}
