import { ComponentStory, ComponentMeta } from '@storybook/react';
import AccountCard from './LinkedAccountsCard';

export default {
    title: 'Profiles/Profile Page/Account Card',
    component: AccountCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },

} as ComponentMeta<typeof AccountCard>;


const Template: ComponentStory<typeof AccountCard> = (args) => <AccountCard {...args} ></AccountCard>

export const Default = Template.bind({});
Default.args = {

}
