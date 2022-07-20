import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';

import Comment from './Comment';

export default {
    title: 'Posts/Components/Comments/Comment with Replies',
    component: Comment,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Comment>;


const Template: ComponentStory<typeof Comment> = (args) => <div className="max-w-[70ch]"><Comment {...args} ></Comment></div>

export const Default = Template.bind({});
Default.args = {
    comment: {
        ...MOCK_DATA.generatePostComments(1)[0],
        created_at: Date.now(),
        replies: [
            { ...MOCK_DATA.generatePostComments(1)[0], replies: [], created_at: Date.now() },
            { ...MOCK_DATA.generatePostComments(1)[0], replies: [], created_at: Date.now() }
        ]
    }
}


