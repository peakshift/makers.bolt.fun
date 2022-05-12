import { ComponentStory, ComponentMeta } from '@storybook/react';

import DatePicker from './DatePicker';

export default {
    title: 'Shared/Inputs/Date Picker',
    component: DatePicker,

} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = (args) => <DatePicker {...args} />


export const Default = Template.bind({});
Default.args = {
    value: new Date(),
    classes: { containerClasses: "max-w-[360px] bg-white" }
}



