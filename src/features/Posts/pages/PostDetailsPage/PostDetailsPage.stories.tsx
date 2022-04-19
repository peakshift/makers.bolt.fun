import { ComponentStory, ComponentMeta } from '@storybook/react';

import PostDetailsPage from './PostDetailsPage';

export default {
    title: 'Posts/Post Details Page',
    component: PostDetailsPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof PostDetailsPage>;


const Template: ComponentStory<typeof PostDetailsPage> = (args) => <PostDetailsPage {...args as any} ></PostDetailsPage>

export const Default = Template.bind({});
Default.args = {
}


