import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);
    let [error, setError] = useState<string | null>(null)

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.currentTarget.value !== '' || e.currentTarget.value.length < 100){
            setTitle(e.currentTarget.value)
        } else {
            setError('Incorrect title')
        }
    }

    return editMode
        ? <TextField value={title} error={!!error} variant={'standard'} onChange={changeTitle} autoFocus style={{width: '200px'}}
                     onBlur={activateViewMode}/>
        : <span style={{hyphens: 'auto', flexWrap: 'wrap'}} onDoubleClick={activateEditMode}>{props.value}</span>

});
