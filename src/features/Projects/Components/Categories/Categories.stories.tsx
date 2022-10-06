import { ComponentStory, ComponentMeta } from '@storybook/react';

import Categories from './Categories';


export default {
    title: 'Projects/Explore Page/Categories',
    component: Categories,

} as ComponentMeta<typeof Categories>;

const Template: ComponentStory<typeof Categories> = (args) => <Categories {...args} />;

export const Default = Template.bind({});

