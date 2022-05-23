import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header from './Header';


export default {
    title: 'Projects/Explore Page/Header',
    component: Header,

} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header />;

export const Default = Template.bind({});

