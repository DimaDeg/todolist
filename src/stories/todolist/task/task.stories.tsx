import {Task} from "../../../features/TodolistsList/Task/ui/Task";
import {TaskPriorities, TaskStatuses} from "../../../api/todolists-api";
import {reduxStoreProviderDecorator} from "../../decorators/reduxStoreProviderDecorator";

export default {
    title: 'Task',
    component: Task,
    decorators: [reduxStoreProviderDecorator]
}

export const TaskBaseExample = () => {
    return <div>
        <Task task={{id:'1',status:TaskStatuses.Completed,title:'CSS', todoListId:'todolistId1',
        addedDate:'',priority:TaskPriorities.Low,startDate:'',deadline:'',order: 0,description:''
        }} todolistId={'todolistId1'}/>
        <Task task={{id:'1',status:TaskStatuses.New,title:'JS', todoListId:'todolistId1',
            addedDate:'',priority:TaskPriorities.Low,startDate:'',deadline:'',order: 0,description:''
        }} todolistId={'todolistId1'}/>
    </div>
}