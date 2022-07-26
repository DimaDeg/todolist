import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {AppRootStateType, useAppDispatch} from '../../app/bll/store'
import {TodolistDomainType} from './Todolist/bll/todolists-reducer'
import {TasksStateType} from './Task/bll/tasks-reducer'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/ui/Todolist'
import {useNavigate} from 'react-router-dom'
import {selectIsLoggedIn} from "../../app/bll/selectors";
import {todolistsActions,} from "./index";
import {bindActionCreators} from "redux";

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {fetchTodolists,addTodolist} = bindActionCreators(todolistsActions,dispatch)

    useEffect(() => {
        if (isLoggedIn) {
            fetchTodolists()
        } else {
            navigate('/login')
        }
    }, [isLoggedIn])



    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px', width:'280px',flexWrap:'wrap',overflowWrap:'break-word'}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
