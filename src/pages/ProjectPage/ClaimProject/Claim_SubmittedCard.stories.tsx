import { ComponentStory, ComponentMeta } from '@storybook/react';

import Claim_SubmittedCard from './Claim_SubmittedCard';

import { ModalsDecorator } from 'src/utils/storybook/decorators';

export default {
    title: 'Project/Claim/Submitted Card',
    component: Claim_SubmittedCard,

    decorators: [ModalsDecorator]
} as ComponentMeta<typeof Claim_SubmittedCard>;

const Template: ComponentStory<typeof Claim_SubmittedCard> = (args) => <Claim_SubmittedCard {...args} />;

export const Default = Template.bind({});

