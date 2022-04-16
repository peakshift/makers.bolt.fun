import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';

import BountyCard from './BountyCard';

export default {
    title: 'Posts/Components/BountyCard',
    component: BountyCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof BountyCard>;


const Template: ComponentStory<typeof BountyCard> = (args) => <div className="max-w-[70ch]"><BountyCard {...args} ></BountyCard></div>

export const Default = Template.bind({});
Default.args = {
    bounty: MOCK_DATA['posts'].bounties[0]
}


