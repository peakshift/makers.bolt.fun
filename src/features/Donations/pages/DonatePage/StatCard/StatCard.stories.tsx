import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FiGrid } from 'react-icons/fi'
import StatCard from './StatCard';

export default {
    title: 'Donations/Donate Page/StatCard',
    component: StatCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof StatCard>;


const Template: ComponentStory<typeof StatCard> = (args) => <div className="max-w-[220px]"><StatCard {...args} ></StatCard></div>

export const Default = Template.bind({});
Default.args = {
    color: "#3B82F6",
    label: <><FiGrid className='scale-125 mr-8' /> Applications</>,
    value: '36'
}


