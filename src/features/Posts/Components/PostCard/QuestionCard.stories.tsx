import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';

import QuestionCard from './QuestionCard';

export default {
    title: 'Posts/Components/QuestionCard',
    component: QuestionCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof QuestionCard>;


const Template: ComponentStory<typeof QuestionCard> = (args) => <div className="max-w-[70ch]"><QuestionCard {...args} ></QuestionCard></div>

export const Default = Template.bind({});
Default.args = {
    question: MOCK_DATA['posts'].questions[0]
}


