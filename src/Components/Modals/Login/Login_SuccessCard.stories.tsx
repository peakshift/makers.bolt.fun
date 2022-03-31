import { ComponentStory, ComponentMeta } from '@storybook/react';

import Login_SuccessCard from './Login_SuccessCard';

import { ModalsDecorator } from 'src/utils/storybook/decorators';

export default {
    title: 'Login/Success Card',
    component: Login_SuccessCard,

    decorators: [ModalsDecorator]
} as ComponentMeta<typeof Login_SuccessCard>;

const Template: ComponentStory<typeof Login_SuccessCard> = (args) => <Login_SuccessCard {...args} />;

export const Default = Template.bind({});

