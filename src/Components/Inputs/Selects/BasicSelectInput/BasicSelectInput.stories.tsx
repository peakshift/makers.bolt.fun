import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MdOutlineKingBed } from 'react-icons/md';

import BasicSelectInput from './BasicSelectInput';

export default {
    title: 'Shared/Inputs/Select/Basic',
    component: BasicSelectInput,

} as ComponentMeta<typeof BasicSelectInput>;

const Template: ComponentStory<typeof BasicSelectInput> = (args) => <BasicSelectInput {...args} />


export const Default = Template.bind({});
Default.args = {
    // defaultValue: 4,
    options: [
        { value: 1, label: "Option 1" },
        { value: 2, label: 'Option 2' },
        { value: 3, label: 'Option 3' },
        { value: 4, label: 'Option 4' },
    ],
    onChange: (nv) => alert("New value is: " + nv),
    labelField: 'label',
    valueField: "value"
}




