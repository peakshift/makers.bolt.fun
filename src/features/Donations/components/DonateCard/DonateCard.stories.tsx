import { ComponentStory, ComponentMeta } from '@storybook/react';
import DonateCard from './DonateCard';


export default {
    title: 'Donations/Componets/Donate Card',
    component: DonateCard,
} as ComponentMeta<typeof DonateCard>;

const Template: ComponentStory<typeof DonateCard> = (args) => <div className="max-w-[326px]"><DonateCard {...args as any} /></div>;

export const Default = Template.bind({});

