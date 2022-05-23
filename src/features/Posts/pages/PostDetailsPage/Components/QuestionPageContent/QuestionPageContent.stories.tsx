import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';

import QuestionPageContent from './QuestionPageContent';

export default {
    title: 'Posts/Post Details Page/Components/Question Page Content',
    component: QuestionPageContent,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof QuestionPageContent>;


const Template: ComponentStory<typeof QuestionPageContent> = (args) => <div className="max-w-[890px]"><QuestionPageContent {...args as any} ></QuestionPageContent></div>

export const Default = Template.bind({});
Default.args = {
    question: MOCK_DATA.posts.questions[0]
}




