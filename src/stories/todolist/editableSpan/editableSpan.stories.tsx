import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";


export default {
    title: 'EditableSpan',
    component: EditableSpan,
    argTypes: {
        onClick:{
            description: 'Button clicked'
        }
    }
}as ComponentMeta<typeof EditableSpan>

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    onChange: action('EditableSpan value changed'),
    value:'15'
}