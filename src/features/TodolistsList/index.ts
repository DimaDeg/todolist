import { tasksReducer } from './Task/bll/tasks-reducer';
import * as tasksActions from './Task/bll/tasksActions'
import {todolistsAsyncActions} from './Todolist/bll/todolistActions'
import {slice, todolistsReducer} from './Todolist/bll/todolists-reducer'
import {TodolistsList} from "./TodolistsList";

const todolistsActions = {
    ...todolistsAsyncActions,
    ...slice.actions
}

export {
    tasksActions,
    todolistsActions,
    TodolistsList,
    todolistsReducer,
    tasksReducer
}
