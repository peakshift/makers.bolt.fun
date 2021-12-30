import { ComponentStory, ComponentMeta } from '@storybook/react';

import Claim_CopySignatureCard from './Claim_CopySignatureCard';

import { ModalsDecorator } from '.storybook/helpers'

export default {
    title: 'Claim/Copy Signature Card',
    component: Claim_CopySignatureCard,

    decorators: [ModalsDecorator]
} as ComponentMeta<typeof Claim_CopySignatureCard>;

const Template: ComponentStory<typeof Claim_CopySignatureCard> = (args) => <Claim_CopySignatureCard {...args} />;

export const Default = Template.bind({});

