import React from 'react';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    title: 'AddItemForm stories',
    component: AddItemForm
} as ComponentMeta<typeof AddItemForm>

const addItemCallback = action('added')

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args}/>

export const AddItemFormBaseExample = Template.bind({})
AddItemFormBaseExample.args = {
    addItem: addItemCallback
}

export const AddItemFormDisabledExample = Template.bind({})
AddItemFormDisabledExample.args = {
    addItem: addItemCallback,
    disabled: true
}