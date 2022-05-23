import { ComponentStory, ComponentMeta } from '@storybook/react';

import Avatar from './Avatar';

export default {
    title: 'Profile/Components/Avatar',
    component: Avatar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Avatar>;


const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} ></Avatar>

export const Default = Template.bind({});
Default.args = {
    src: 'https://i.pravatar.cc/300'
}


