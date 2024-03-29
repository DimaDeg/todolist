import React, {useCallback, useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../../features/TodolistsList/'
import {useSelector} from 'react-redux'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../../components/ErrorSnackbar/ErrorSnackbar';
import {Navigate, Route, Routes} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import {selectIsInitialized, selectIsLoggedIn, selectStatus} from "../bll/selectors";
import {useAppDispatch} from "../bll/store";
import {bindActionCreators} from "redux";
import {authActions, Login} from "../../features/auth";
import {appActions} from "../../features/Application";

const App = () => {

    const dispatch = useAppDispatch()
    const status = useSelector(selectStatus)
    const isInitialized = useSelector(selectIsInitialized)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const {initializeApp} = bindActionCreators(appActions,dispatch)
    const {logout} = bindActionCreators(authActions,dispatch)

    useEffect(() => {
        if (!isInitialized) {
            initializeApp()
        }
    }, [])

    const LogoutHandler = useCallback(() => {
        logout()
    }, []);

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={LogoutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/404'} element={<h1 style={{textAlign: 'center'}}>404 not found</h1>}/>
                    <Route path={'/*'} element={<Navigate to={'/404'}/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
