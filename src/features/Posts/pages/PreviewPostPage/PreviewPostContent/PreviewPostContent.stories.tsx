import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';

import PreviewPostContent from './PreviewPostContent';

export default {
    title: 'Posts/Post Details Page/Components/Story Page Content',
    component: PreviewPostContent,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof PreviewPostContent>;


const Template: ComponentStory<typeof PreviewPostContent> = (args) => <div className="max-w-[890px]"><PreviewPostContent {...args as any} ></PreviewPostContent></div>

export const Default = Template.bind({});
Default.args = {
    post: MOCK_DATA.posts.stories[0]
}




