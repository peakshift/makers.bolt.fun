import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';

import PageContent from './PageContent';

export default {
    title: 'Posts/Post Details Page/Components/PageContent',
    component: PageContent,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof PageContent>;


const Template: ComponentStory<typeof PageContent> = (args) => <div className="max-w-[890px]"><PageContent {...args as any} ></PageContent></div>

export const Story = Template.bind({});
Story.args = {
    post: MOCK_DATA.posts.stories[0]
}

export const Bounty = Template.bind({});
Bounty.args = {
    post: MOCK_DATA.posts.bounties[0]
}


