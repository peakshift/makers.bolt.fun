import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MdOutlineKingBed } from 'react-icons/md';

import SelectInput from './SelectInput';

export default {
    title: 'Shared/SelectInput',
    component: SelectInput,

} as ComponentMeta<typeof SelectInput>;

const Template: ComponentStory<typeof SelectInput> = (args) => <SelectInput {...args} />


export const Default = Template.bind({});
Default.args = {
    // defaultValue: 4,
    options: [
        { value: 1, label: "Option 1" },
        { value: 2, label: 'Option 2' },
        { value: 3, label: 'Option 3' },
        { value: 4, label: 'Option 4' },
    ],
    onChange: (nv) => alert("New value is: " + nv)
}

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,

    onChange: (nv) => alert("New value is: " + nv)
}



