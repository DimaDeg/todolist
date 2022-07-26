import React, {useCallback, useEffect} from 'react'
import {AddItemForm} from '../../../../components/AddItemForm/AddItemForm'
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {Delete} from '@mui/icons-material';
import {Task} from '../../Task/ui/Task'
import {TaskStatuses, TaskType} from '../../../../api/todolists-api'
import {FilterValuesType, TodolistDomainType} from '../bll/todolists-reducer'
import {bindActionCreators} from "redux";
import {tasksActions, todolistsActions} from "../../index";
import {useAppDispatch} from "../../../../app/bll/store";



type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    demo?: boolean
}

type ColorType = 'inherit' | 'primary' | 'secondary'


export const Todolist = React.memo( ({demo = false, ...props}: PropsType) => {
    console.log('Todolist called')

    const dispatch = useAppDispatch()

    const {changeTodolistFilter, removeTodolist, changeTodolistTitle} = bindActionCreators(todolistsActions, dispatch)
    const {addTask, fetchTasks} = bindActionCreators(tasksActions, dispatch)

    const {todolist,tasks} = props


    useEffect(() => {
        if (demo) {
            return
        }
        fetchTasks(todolist.id)
    }, [])

    const addTaskCallback = useCallback((title: string) => {
        addTask({title, todolistId: todolist.id})
    }, [todolist.id])

    const removeTodolistCallback = useCallback(() => {
        removeTodolist(todolist.id)
    }, [todolist.id])

    const changeTodolistTitleCallback = useCallback((title: string) => {
        changeTodolistTitle({id: todolist.id, title})
    }, [todolist.id])



    const onButtonFilterClickHandler = useCallback((filter:FilterValuesType) => changeTodolistFilter({
        filter, id: props.todolist.id
    }), [props.todolist.id])

    let tasksForTodolist = tasks

    if (props.todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const renderFilterButton = (buttonFilter: FilterValuesType,
                                color: ColorType, text: string) => {
        return <Button variant={props.todolist.filter === buttonFilter ? 'outlined' : 'text'}
                       onClick={()=>onButtonFilterClickHandler(buttonFilter)}
                       color={color}
        >{text}
        </Button>
    }

    return <div>
        <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitleCallback}/>
            <IconButton onClick={removeTodolistCallback} disabled={todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === 'loading'}/>
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={todolist.id}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            {renderFilterButton('all','inherit','All')}
            {renderFilterButton('active','primary','Active')}
            {renderFilterButton('completed','secondary','Completed')}
        </div>
    </div>
})

