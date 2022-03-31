import { ComponentStory, ComponentMeta } from '@storybook/react';

import Login_ScanningWalletCard from './Login_ScanningWalletCard';

import { ModalsDecorator } from 'src/utils/storybook/decorators';

export default {
    title: 'Login/Scanning Wallet Card',
    component: Login_ScanningWalletCard,

    decorators: [ModalsDecorator]
} as ComponentMeta<typeof Login_ScanningWalletCard>;

const Template: ComponentStory<typeof Login_ScanningWalletCard> = (args) => <Login_ScanningWalletCard {...args} />;

export const Default = Template.bind({});

