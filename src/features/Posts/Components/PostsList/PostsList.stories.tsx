import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';

import PostsList from './PostsList';

export default {
    title: 'Posts/Components/PostsList',
    component: PostsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof PostsList>;


const Template: ComponentStory<typeof PostsList> = (args) => <div className="max-w-[70ch]"><PostsList {...args} ></PostsList></div>

export const Default = Template.bind({});
Default.args = {
    items: MOCK_DATA['feed']
}


