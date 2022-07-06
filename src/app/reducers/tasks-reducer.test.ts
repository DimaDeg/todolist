import {addTaskAC, removeTaskAC, setTasksAC, tasksReducer, TasksStateType, updateTaskAC} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";

let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1', title: 'css', status: TaskStatuses.New, todoListId: 'todolistId1',
                description: '', startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, addedDate: ''
            },
            {
                id: '2', title: 'js', status: TaskStatuses.New, todoListId: 'todolistId1',
                description: '', startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, addedDate: ''
            },
            {
                id: '3', title: 'react', status: TaskStatuses.New, todoListId: 'todolistId1',
                description: '', startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, addedDate: ''
            },
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, todoListId: 'todolistId1',
                description: '', startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, addedDate: ''
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.New, todoListId: 'todolistId2',
                description: '', startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, addedDate: ''
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todolistId1',
                description: '', startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, addedDate: ''
            },
        ],
    };
});

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC({taskId: '2', todolistId: 'todolistId2'});
    const endState = tasksReducer(startState, action);
    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy();

});

test('correct task should be added to correct array', () => {
    const action = addTaskAC({
        id: 'id4', addedDate: ''
        , startDate: '', status: TaskStatuses.New, todoListId: 'todolistId2'
        , order: 0, priority: TaskPriorities.Low, title: 'juice', deadline: '', description: ''
    });
    const endState = tasksReducer(startState, action);
    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juice');
});

test('status should be updated in correct array', () => {
    const action = updateTaskAC({taskId: '2', todolistId: 'todolistId2', model: {status: TaskStatuses.Completed}});
    const endState = tasksReducer(startState, action);
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.New);
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed);
});

test('task title should be updated in correct array', () => {
    const action = updateTaskAC({taskId: '2', todolistId: 'todolistId2', model: {title: 'juice'}});
    const endState = tasksReducer(startState, action);
    expect(endState['todolistId1'][1].title).toBe('js');
    expect(endState['todolistId2'][1].title).toBe('juice');
});

test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC({todolist: {id: 'newId', title: 'new todo', addedDate: '', order: 0}})
    const endState = tasksReducer(startState, action);
    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }
    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC({id: 'todolistId2'});
    const endState = tasksReducer(startState, action);
    const keys = Object.keys(endState);
    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined();
});

test('empty array should be added when we set todolist', () => {
    const action = setTodolistsAC({
        todolists: [{
            id: '1', title: 'title 1', order: 0, addedDate: ''
        },
            {
                id: '2', title: 'title2', order: 0, addedDate: ''
            }]
    });
    const endState = tasksReducer({}, action);
    const keys = Object.keys(endState);
    expect(keys.length).toBe(2);
    expect(endState['1']).toBeDefined();
    expect(endState['2']).toBeDefined();
});

test('tasks should be fetched in todolist', () => {
    const action = setTasksAC({tasks: startState['todolistId1'], todolistId: 'todolistId1'});
    const endState = tasksReducer({
        'todolistId1': [], 'todolistId2': []
    }, action);
    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(0);
})


