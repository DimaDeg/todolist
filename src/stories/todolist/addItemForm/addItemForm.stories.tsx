import React from 'react';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'AddItemForm stories',
    component: AddItemForm
}

const asyncCallback = async (...params: any) => {
    action('Button inside form clicked')(...params)
}

export const AddItemFormBaseExample = () => {
    return <AddItemForm addItem={asyncCallback}/>
}

export const AddItemFormBaseDisabledExample = () => {
    return <AddItemForm addItem={asyncCallback} disabled={true}/>
}