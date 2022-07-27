import React, {useCallback, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {AppRootStateType, useAppDispatch} from '../../app/bll/store'
import {TodolistDomainType} from './Todolist/bll/todolists-reducer'
import {TasksStateType} from './Task/bll/tasks-reducer'
import Grid from '@mui/material/Grid';
import {AddItemForHelperType, AddItemForm} from '../../components/AddItemForm/AddItemForm'
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
    const {fetchTodolists} = bindActionCreators(todolistsActions,dispatch)

    useEffect(() => {
        if (isLoggedIn) {
            fetchTodolists()
        } else {
            navigate('/login')
        }
    }, [isLoggedIn])

    const addTodolistCallback = useCallback(async (title: string,helper:AddItemForHelperType) => {
        let thunk = todolistsActions.addTodolist(title)
        const resAction = await dispatch(thunk)
        if(todolistsActions.addTodolist.rejected.match(resAction)){
            if(resAction.payload?.errors?.length){
                const errorMessage = resAction.payload?.errors[0]
                helper.setError(errorMessage)
            } else {
                helper.setError('Some error occurred')
            }
        } else {
            helper.setTitle('')
        }
    }, [])

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolistCallback}/>
        </Grid>
        <Grid container spacing={3} style={{flexWrap:'nowrap', overflowX: 'scroll'}}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]
                    return <Grid item key={tl.id}>
                        <div style={{ width: '300px',overflowWrap:'break-word'}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                demo={demo}
                            />
                        </div>
                    </Grid>
                })
            }
        </Grid>
    </>
}
