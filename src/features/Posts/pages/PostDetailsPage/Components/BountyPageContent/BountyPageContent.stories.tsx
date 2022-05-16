import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';

import BountyPageContent from './BountyPageContent';

export default {
    title: 'Posts/Post Details Page/Components/Bounty Page Content',
    component: BountyPageContent,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof BountyPageContent>;


const Template: ComponentStory<typeof BountyPageContent> = (args) => <div className="max-w-[890px]"><BountyPageContent {...args as any} ></BountyPageContent></div>

export const Default = Template.bind({});
Default.args = {
    bounty: MOCK_DATA.posts.bounties[0]
}




