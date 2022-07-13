import {Task} from "../../../features/TodolistsList/Todolist/Task/Task";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {TaskStatuses} from "../../../api/todolists-api";

export default {
    title: 'Task',
    component: Task
}as ComponentMeta<typeof Task>

const changeTaskStatusCallback = action('status changed')
const changeTaskTitleCallback = action('title changed')
const removeTaskCallback = action('remove button clicked')

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback,
}

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>

export const TaskIsDoneExample = Template.bind({})
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id:'1',status:TaskStatuses.Completed,description:'',deadline:''
        ,priority:0,order:0,todoListId:'todoID1',startDate:'',addedDate:'', title: 'JS'},
}

export const TaskIsNotDoneExample = Template.bind({})
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id:'1',status:TaskStatuses.New,description:'',deadline:''
        ,priority:0,order:0,todoListId:'todoID1',startDate:'',addedDate:'', title: 'JS'},
}