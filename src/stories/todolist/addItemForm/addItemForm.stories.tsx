import React from 'react';
import {AddItemForm, AddItemFormPropsType} from "../../../components/AddItemForm/AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
  title: 'AddItemForm stories',
  component: AddItemForm
}

const addItemCallback = action('added')

export const AddItemFormBaseExample = (props:AddItemFormPropsType) => {
  return (
      <AddItemForm addItem={props.addItem}/>
  );
};

export const AddItemFormDisabledExample = (props:AddItemFormPropsType) => {
  return (
      <AddItemForm addItem={addItemCallback} disabled={true}/>
  );
};