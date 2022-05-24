import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FiGrid } from 'react-icons/fi'
import DonationStats from './DonationStats';

export default {
    title: 'Donations/Donate Page/DonationStats',
    component: DonationStats,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof DonationStats>;


const Template: ComponentStory<typeof DonationStats> = (args) => <div className="max-w-[910px] mx-auto"><DonationStats {...args as any} ></DonationStats></div>

export const Default = Template.bind({});
Default.args = {
}


