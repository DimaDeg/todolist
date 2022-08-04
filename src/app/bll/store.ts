import thunkMiddleware from 'redux-thunk'
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {rootReducer} from "./reducers";
import {AppDispatchType} from "./types";

// непосредственно создаём store
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});
// @ts-ignore
window.store = store;

export const useAppDispatch = () => useDispatch<AppDispatchType>()

if(process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers',()=>{
        store.replaceReducer(rootReducer)
    })
}