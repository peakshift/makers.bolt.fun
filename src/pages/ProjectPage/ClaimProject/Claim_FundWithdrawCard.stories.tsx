import { ComponentStory, ComponentMeta } from '@storybook/react';

import Claim_FundWithdrawCard from './Claim_FundWithdrawCard';

import { ModalsDecorator } from 'src/utils/storybookDecorators'

export default {
    title: 'Project/Claim/Fund Withdraw Card',
    component: Claim_FundWithdrawCard,

    decorators: [ModalsDecorator]
} as ComponentMeta<typeof Claim_FundWithdrawCard>;

const Template: ComponentStory<typeof Claim_FundWithdrawCard> = (args) => <Claim_FundWithdrawCard {...args} />;

export const Default = Template.bind({});

