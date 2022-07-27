import {TodolistType} from '../../../../api/todolists-api'
import {RequestStatusType} from '../../../../app/bll/app-reducer'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    addTodolist,
    changeTodolistTitle,
    fetchTodolists,
    removeTodolist
} from "./todolistActions";

export const slice = createSlice({
    name: 'todolist',
    initialState: [] as TodolistDomainType[],
    reducers: {
        changeTodolistFilter: (state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) => {
            const index = state.findIndex(f => f.id === action.payload.id);
            console.log('logged')
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC: (state, action: PayloadAction<{ id: string, status: RequestStatusType }>) => {
            const index = state.findIndex(f => f.id === action.payload.id);
            state[index].entityStatus = action.payload.status
        },

    },
    extraReducers: builder => {
        builder.addCase(fetchTodolists.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(removeTodolist.fulfilled, (state, action) => {
            const index = state.findIndex(f => f.id === action.payload.id);
            if (index > -1) {
                state.splice(index, 1);
            }
        });
        builder.addCase(addTodolist.fulfilled, (state, action) => {
            state.unshift({...action.payload, filter: 'all', entityStatus: 'idle'})
        });
        builder.addCase(changeTodolistTitle.fulfilled, (state, action) => {
            const index = state.findIndex(f => f.id === action.payload.id);
            state[index].title = action.payload.title;
        });
    }
})

export const todolistsReducer = slice.reducer;

export const {changeTodolistEntityStatusAC, changeTodolistFilter} = slice.actions


// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}