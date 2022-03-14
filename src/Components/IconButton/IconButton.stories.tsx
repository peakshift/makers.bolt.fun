import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MdDelete } from 'react-icons/md'

import IconButton from './IconButton';

export default {
    title: 'Shared/IconButton',
    component: IconButton,

} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => <div className="w-[720px]"><IconButton {...args} /></div>;


export const Default = Template.bind({});
Default.args = {
    children: <MdDelete />
}

export const LargeButton = Template.bind({});
LargeButton.args = {
    children: <MdDelete />,
    size: 'lg'
}

export const Link = Template.bind({});
Link.args = {
    children: <MdDelete />,
    href: '/link'
}

export const Customized = Template.bind({});
Customized.args = {
    children: <MdDelete className='text-white' />,
    className: '!bg-primary-500 hover:!bg-primary-700'
}

