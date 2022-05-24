import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header from './Header';

export default {
    title: 'Donations/Donate Page/Header',
    component: Header,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Header>;


const Template: ComponentStory<typeof Header> = (args) => <Header {...args as any} ></Header>

export const Default = Template.bind({});
Default.args = {
}


