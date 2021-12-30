import { ComponentStory, ComponentMeta } from '@storybook/react';

import TipCard from './TipCard';

import { ModalsDecorator } from '.storybook/helpers'

export default {
    title: 'Tip/Tip Card',
    component: TipCard,

    decorators: [ModalsDecorator]
} as ComponentMeta<typeof TipCard>;

const Template: ComponentStory<typeof TipCard> = (args) => <TipCard {...args} />;

export const Default = Template.bind({});

