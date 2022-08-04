// определить автоматически тип всего объекта состояния
import {rootReducer} from "./reducers";
import {store} from "./store";

export type AppRootStateType = ReturnType<RootReducerType>
export type RootReducerType = typeof rootReducer
export type AppDispatchType = typeof store.dispatch
export type ThunkErrorType = { rejectValue: { errors: string[], fieldsErrors?: string[] | undefined } }