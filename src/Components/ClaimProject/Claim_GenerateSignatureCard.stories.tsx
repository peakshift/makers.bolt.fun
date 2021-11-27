import { ComponentStory, ComponentMeta } from '@storybook/react';

import Claim_GenerateSignatureCard from './Claim_GenerateSignatureCard';

import { ModalsDecorator } from '.storybook/helpers'

export default {
    title: 'Claim/Generate Signature Card',
    component: Claim_GenerateSignatureCard,

    decorators: [ModalsDecorator]
} as ComponentMeta<typeof Claim_GenerateSignatureCard>;

const Template: ComponentStory<typeof Claim_GenerateSignatureCard> = (args) => <Claim_GenerateSignatureCard {...args} />;

export const Default = Template.bind({});

