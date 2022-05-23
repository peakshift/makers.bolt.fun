import { ComponentStory, ComponentMeta } from '@storybook/react';

import FeedPage from './FeedPage';

export default {
    title: 'Posts/Feed Page/Page',
    component: FeedPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof FeedPage>;


const Template: ComponentStory<typeof FeedPage> = (args) => <FeedPage {...args as any} ></FeedPage>

export const Default = Template.bind({});
Default.args = {
}


