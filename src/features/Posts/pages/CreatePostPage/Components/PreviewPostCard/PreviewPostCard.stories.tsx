import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';

import PreviewPostCard from './PreviewPostCard';

export default {
    title: 'Posts/Post Details Page/Components/Preview Post Card',
    component: PreviewPostCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof PreviewPostCard>;


const Template: ComponentStory<typeof PreviewPostCard> = (args) => <div className="max-w-[890px]"><PreviewPostCard {...args as any} ></PreviewPostCard></div>

export const Default = Template.bind({});
Default.args = {
    post: MOCK_DATA.posts.stories[0]
}




