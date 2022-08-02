import {TaskPriorities, TaskStatuses, TaskType, TodolistType} from '../../../../api/types';
import {createSlice,} from "@reduxjs/toolkit";
import {
    addTask,
    fetchTasks,
    removeTask,
    updateTask
} from "./tasksActions";
import {todolistsAsyncActions} from "../../Todolist/bll/todolistActions";

const initialState: TasksStateType = {}

export const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(todolistsAsyncActions.addTodolist.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = [];
            })
            .addCase(todolistsAsyncActions.removeTodolist.fulfilled, (state, action) => {
                delete state[action.payload.id];
            })
            .addCase(todolistsAsyncActions.fetchTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach((tl: TodolistType) => {
                    state[tl.id] = [];
                })
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks;
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId];
                const index = tasks.findIndex(t => t.id === action.payload.taskId);
                if (index > -1) {
                    tasks.splice(index, 1)
                }
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.todoListId].unshift(action.payload)
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId];
                const index = tasks.findIndex(t => t.id === action.payload.taskId);
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...action.payload.model}
                }
            });
    }
});

export const tasksReducer = slice.reducer;

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


