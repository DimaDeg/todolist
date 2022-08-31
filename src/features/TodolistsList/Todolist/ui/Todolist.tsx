import React, {useCallback, useEffect} from 'react'
import {AddItemForHelperType, AddItemForm} from '../../../../components/AddItemForm/AddItemForm'
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {Delete} from '@mui/icons-material';
import {Task} from '../../Task/ui/Task'
import {FilterValuesType, TodolistDomainType} from '../bll/todolists-reducer'
import {bindActionCreators} from "redux";
import {tasksActions, todolistsActions} from "../../index";
import {useAppDispatch} from "../../../../app/bll/store";
import Paper from "@mui/material/Paper";
import {TaskStatuses, TaskType} from "../../../../api/types";


type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
}

type ColorType = 'inherit' | 'primary' | 'secondary'

export const Todolist:React.FC<PropsType> = React.memo( ({todolist,tasks}) => {

    const dispatch = useAppDispatch()

    const {changeTodolistFilter, removeTodolist, changeTodolistTitle} = bindActionCreators(todolistsActions, dispatch)
    const {fetchTasks} = bindActionCreators(tasksActions, dispatch)

    useEffect(() => {
        fetchTasks(todolist.id)
    }, [])

    const addTaskCallback = useCallback(async (title: string,helper:AddItemForHelperType) => {
        let thunk = tasksActions.addTask({title,todolistId: todolist.id})
        const resAction = await dispatch(thunk)
        if(tasksActions.addTask.rejected.match(resAction)){
            if(resAction.payload?.errors?.length){
                const errorMessage = resAction.payload?.errors[0]
                helper.setError(errorMessage)
            } else {
                helper.setError('Some error occurred')
            }
        } else {
            helper.setTitle('')
        }
    }, [todolist.id])

    const removeTodolistCallback = useCallback(() => {
        removeTodolist(todolist.id)
    }, [todolist.id])

    const changeTodolistTitleCallback = useCallback((title: string) => {
        changeTodolistTitle({id: todolist.id, title})
    }, [todolist.id])



    const onButtonFilterClickHandler = useCallback((filter:FilterValuesType) => changeTodolistFilter({
        filter, id: todolist.id
    }), [todolist.id])

    let tasksForTodolist = tasks

    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const renderFilterButton = (buttonFilter: FilterValuesType,
                                color: ColorType, text: string) => {
        return <Button variant={todolist.filter === buttonFilter ? 'outlined' : 'text'}
                       onClick={()=>onButtonFilterClickHandler(buttonFilter)}
                       color={color}
        >{text}
        </Button>
    }

    return <Paper style={{padding: '10px',position:'relative'}}>
        <IconButton size={'small'} onClick={removeTodolistCallback} disabled={todolist.entityStatus === 'loading'}
                    style={{position:'absolute',right:'5px', top:'5px'}}>
            <Delete fontSize={'small'}/>
        </IconButton>
        <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitleCallback}/>
        </h3>
        <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === 'loading'}/>
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={todolist.id}
                />)
            }
            {!tasksForTodolist.length && <div style={{ padding: '10px', color:'grey'}}>No Tasks</div>}
        </div>
        <div style={{paddingTop: '10px'}}>
            {renderFilterButton('all','inherit','All')}
            {renderFilterButton('active','primary','Active')}
            {renderFilterButton('completed','secondary','Completed')}
        </div>
    </Paper>
})

