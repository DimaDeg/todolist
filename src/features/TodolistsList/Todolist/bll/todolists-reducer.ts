import {RequestStatusType} from '../../../Application/bll/application-reducer'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todolistsAsyncActions} from "./todolistActions";
import {TodolistType} from '../../../../api/types';


const {fetchTodolists,removeTodolist,changeTodolistTitle,addTodolist} = todolistsAsyncActions
export const slice = createSlice({
    name: 'todolist',
    initialState: [] as TodolistDomainType[],
    reducers: {
        changeTodolistFilter: (state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) => {
            const index = state.findIndex(f => f.id === action.payload.id);
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string, status: RequestStatusType }>) => {
            const index = state.findIndex(f => f.id === action.payload.id);
            state[index].entityStatus = action.payload.status
        },

    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map((tl) => ({...tl, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex(f => f.id === action.payload.id);
                if (index > -1) {
                    state.splice(index, 1);
                }
            })
            .addCase(addTodolist.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(changeTodolistTitle.fulfilled, (state, action) => {
                const index = state.findIndex(f => f.id === action.payload.id);
                state[index].title = action.payload.title;
            });
    }
})

export const todolistsReducer = slice.reducer;
export const {changeTodolistFilter,changeTodolistEntityStatus} = slice.actions

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
