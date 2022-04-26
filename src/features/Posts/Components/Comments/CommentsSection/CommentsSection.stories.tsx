import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';

import CommentsSection from './CommentsSection';

export default {
    title: 'Posts/Components/Comments/CommentsSection',
    component: CommentsSection,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentsSection>;


const Template: ComponentStory<typeof CommentsSection> = (args) => <div className="max-w-[70ch]"><CommentsSection {...args} ></CommentsSection></div>

export const Default = Template.bind({});
Default.args = {
    comments: MOCK_DATA.generatePostComments(15)
}


