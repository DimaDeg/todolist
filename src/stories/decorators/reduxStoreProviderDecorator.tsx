import {AppRootStateType, RootReducerType} from "../../app/bll/store";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";
import {combineReducers} from "redux";
import {tasksReducer} from "../../features/TodolistsList/";
import {todolistsReducer} from "../../features/TodolistsList/";
import {authReducer} from "../../features/auth/";
import {appReducer} from "../../app/";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";

const storeRootReducer: RootReducerType = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    auth: authReducer,
    app: appReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', order: 0, addedDate: '', entityStatus: "idle"},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', order: 0, addedDate: '', entityStatus: "idle"},
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: 'id1',
                title: 'HTML&CSS',
                order: 0,
                todoListId: 'todolistId1',
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: 'id2',
                title: 'JS',
                order: 0,
                todoListId: 'todolistId1',
                status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: ''
            }
        ],
        ['todolistId2']: [
            {
                id: 'id3',
                title: 'Milk',
                order: 0,
                todoListId: 'todolistId2',
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: 'id4',
                title: 'React Book',
                order: 0,
                todoListId: 'todolistId2',
                status: TaskStatuses.New,
                description: ''
                ,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: ''
            }
        ]
    }, auth: {
        isLoggedIn: true
    }, app: {
        error: null,
        status: "succeeded",
        isInitialized: true
    }
}

export const storybookStore = configureStore({
    reducer: storeRootReducer,
    preloadedState: initialGlobalState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export const reduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storybookStore}>
        {storyFn()}
    </Provider>
)

export const BrowserRouterDecorator = (storyFn: any)=> (
    <HashRouter>
        {storyFn()}
    </HashRouter>
)