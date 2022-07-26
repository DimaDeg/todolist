import * as tasksActions from './Task/bll/tasksActions'
import * as todolistAsyncActions from './Todolist/bll/todolistActions'
import {slice} from './Todolist/bll/todolists-reducer'
import {TodolistsList} from "./TodolistsList";

const todolistsActions = {
    ...todolistAsyncActions,
    ...slice.actions
}

export {
    tasksActions,
    todolistsActions,
    TodolistsList
}
