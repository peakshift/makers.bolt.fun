import { ComponentStory, ComponentMeta } from '@storybook/react';

import Claim_GenerateSignatureCard from './Claim_GenerateSignatureCard';

import { ModalsDecorator } from 'src/utils/storybook/decorators';

export default {
    title: 'Projects/Claim/Generate Signature Card',
    component: Claim_GenerateSignatureCard,

    decorators: [ModalsDecorator]
} as ComponentMeta<typeof Claim_GenerateSignatureCard>;

const Template: ComponentStory<typeof Claim_GenerateSignatureCard> = (args) => <Claim_GenerateSignatureCard {...args} />;

export const Default = Template.bind({});

