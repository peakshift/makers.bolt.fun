import { ComponentStory, ComponentMeta } from '@storybook/react';

import CreatePostPage from './CreatePostPage';

export default {
    title: 'Posts/Create Post Page',
    component: CreatePostPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CreatePostPage>;


const Template: ComponentStory<typeof CreatePostPage> = (args) => <CreatePostPage {...args as any} ></CreatePostPage>

export const Default = Template.bind({});
Default.args = {
}


