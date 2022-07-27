import React, {ChangeEvent, useCallback} from 'react'
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan'
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import {TaskStatuses, TaskType} from '../../../../api/todolists-api'
import {bindActionCreators} from "redux";
import {tasksActions} from "../../index";
import {useAppDispatch} from "../../../../app/bll/store";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props:TaskPropsType) => {

    const {task,todolistId} = props

    const {removeTask, updateTask} = bindActionCreators(tasksActions, useAppDispatch())

    const removeTaskCallback = useCallback(() => removeTask({taskId:task.id, todolistId}),
        [task.id, todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        updateTask({taskId:task.id,
            model: {status:e.currentTarget.checked ? TaskStatuses.Completed: TaskStatuses.New},
            todolistId})
    }, [task.id,todolistId]);


    const onTitleChangeHandler = useCallback((title: string) => {
        updateTask({taskId:task.id, model: {title}, todolistId})    },
        [task.id, todolistId]);

    return <div key={task.id} style={{position:'relative'}} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
        <IconButton size={'small'} onClick={removeTaskCallback} style={{position:'absolute', top:'3px', right:'-5px'}}>
            <Delete fontSize={'small'}/>
        </IconButton>
    </div>
})
