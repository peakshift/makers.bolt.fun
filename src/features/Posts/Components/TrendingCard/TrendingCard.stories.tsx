import { ComponentStory, ComponentMeta } from '@storybook/react';

import TrendingCard from './TrendingCard';

export default {
    title: 'Posts/Components/TrendingCard',
    component: TrendingCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof TrendingCard>;


const Template: ComponentStory<typeof TrendingCard> = (args) => <div className="max-w-[326px]"><TrendingCard {...args as any} ></TrendingCard></div>

export const Default = Template.bind({});
Default.args = {
}


