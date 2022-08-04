import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../app/bll/store';
import {TodolistDomainType} from './Todolist/bll/todolists-reducer';
import {TasksStateType} from './Task/bll/tasks-reducer';
import Grid from '@mui/material/Grid';
import {AddItemForHelperType, AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {Todolist} from './Todolist/ui/Todolist';
import {useNavigate} from 'react-router-dom';
import {selectIsLoggedIn} from "../../app/bll/selectors";
import {todolistsActions,} from "./index";
import {bindActionCreators} from "redux";
import {AppRootStateType} from "../../app/bll/types";


export const TodolistsList = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {fetchTodolists,addTodolist} = bindActionCreators(todolistsActions,dispatch)

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
        }
        if (!todolists.length){
            fetchTodolists()
        }
    }, [])

    const addTodolistCallback = useCallback(async (title: string,helper:AddItemForHelperType) => {
        addTodolist(title);
        helper.setTitle('')
    }, [])


    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolistCallback}/>
        </Grid>
        <Grid container spacing={3} style={{flexWrap:'nowrap'}}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]
                    return <Grid item key={tl.id}>
                        <div style={{ width: '300px',overflowWrap:'break-word'}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                            />
                        </div>
                    </Grid>
                })
            }
        </Grid>
    </>
}
