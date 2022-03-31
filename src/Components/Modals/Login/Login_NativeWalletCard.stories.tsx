import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ModalsDecorator } from 'src/utils/storybook/decorators';

import Login_NativeWalletCard from './Login_NativeWalletCard';


export default {
    title: 'Login/Native Wallet Card',
    component: Login_NativeWalletCard,

    decorators: [ModalsDecorator]
} as ComponentMeta<typeof Login_NativeWalletCard>;

const Template: ComponentStory<typeof Login_NativeWalletCard> = (args) => <Login_NativeWalletCard {...args} />;

export const Default = Template.bind({});

