import { ComponentStory, ComponentMeta } from '@storybook/react';

import VoteCard from './VoteCard';

import { ModalsDecorator } from 'src/utils/storybookDecorators'

export default {
    title: 'Components/Cards/Vote Card',
    component: VoteCard,

    decorators: [ModalsDecorator]
} as ComponentMeta<typeof VoteCard>;

const Template: ComponentStory<typeof VoteCard> = (args) => <VoteCard {...args} />;

export const Default = Template.bind({});

