import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';

import StoryPageContent from './StoryPageContent';

export default {
    title: 'Posts/Post Details Page/Components/Story Page Content',
    component: StoryPageContent,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof StoryPageContent>;


const Template: ComponentStory<typeof StoryPageContent> = (args) => <div className="max-w-[890px]"><StoryPageContent {...args as any} ></StoryPageContent></div>

export const Default = Template.bind({});
Default.args = {
    story: MOCK_DATA.posts.stories[0]
}




