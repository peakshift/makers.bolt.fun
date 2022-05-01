import { ComponentStory, ComponentMeta } from '@storybook/react';

import AddComment from './AddComment';

export default {
    title: 'Posts/Components/Comments/Add Comment',
    component: AddComment,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AddComment>;


const Template: ComponentStory<typeof AddComment> = (args) => <div className="max-w-[70ch]"><AddComment {...args} ></AddComment></div>

export const Default = Template.bind({});
Default.args = {
    placeholder: "Leave a comment..."
}


