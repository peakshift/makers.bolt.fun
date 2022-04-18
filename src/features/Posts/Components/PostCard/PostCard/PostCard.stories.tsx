import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';

import PostCard from './PostCard';
import PostCardSkeleton from './PostCard.Skeleton';

export default {
    title: 'Posts/Components/PostCard',
    component: PostCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof PostCard>;


const Template: ComponentStory<typeof PostCard> = (args) => <div className="max-w-[70ch]"><PostCard {...args} ></PostCard></div>

export const Default = Template.bind({});
Default.args = {
    post: MOCK_DATA['posts'].stories[0]
}

const LoadingTemplate: ComponentStory<typeof PostCardSkeleton> = (args) => <div className="max-w-[70ch]"><PostCardSkeleton ></PostCardSkeleton></div>

export const Loading = LoadingTemplate.bind({});
Loading.args = {
}


