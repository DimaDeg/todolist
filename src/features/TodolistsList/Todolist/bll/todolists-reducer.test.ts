import {
    changeTodolistEntityStatusAC, changeTodolistFilter, TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";
import {TodolistType} from "../../../../api/todolists-api";
import {
    addTodolist,
    changeTodolistTitle, fetchTodolists,
    removeTodolist
} from "./todolistActions";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
    todolistId1 = 'todoId1';
    todolistId2 = 'todoId2';
    startState = [
        {id: todolistId1, title: 'what to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: 'what to buy', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolist.fulfilled({id: todolistId1},'requestId',todolistId1));
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})

test('correct todolist should be added', () => {
    let todo:TodolistType = {
        id:'new',
        title:'new todo',
        order:0,
        addedDate:'',
    }

    const endState = todolistsReducer(startState,addTodolist.fulfilled(todo,'requestId','new todo'))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(todo.title);
    expect(endState[0].filter).toBe('all');
});

test('filter should be changed',()=>{
    const action = changeTodolistFilter({id:todolistId2,filter:'completed'});

    const endState = todolistsReducer(startState,action);

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe('completed');
});

test('todolist should changed its name',()=>{
    const param = {id:todolistId2,title:'new title'}
    const action = changeTodolistTitle.fulfilled(param,'requestId',param);

    const endState = todolistsReducer(startState,action);

    expect(endState[0].title).toBe('what to learn');
    expect(endState[1].title).toBe('new title');
});

test('todolists should be added',()=>{

    const action = fetchTodolists.fulfilled({todolists:startState},'requestId');

    const endState = todolistsReducer([],action);

    expect(endState.length).toBe(2);
});

test('entity status should be changed',()=>{
    const action = changeTodolistEntityStatusAC({id:todolistId2,status:'loading'});

    const endState = todolistsReducer(startState,action);

    expect(endState[0].entityStatus).toBe('idle');
    expect(endState[1].entityStatus).toBe('loading');
});

