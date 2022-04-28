import { ComponentStory, ComponentMeta } from '@storybook/react';

import QuestionForm from './QuestionForm';

export default {
    title: 'Posts/Create Post Page/Question Form',
    component: QuestionForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof QuestionForm>;


const Template: ComponentStory<typeof QuestionForm> = (args) => <div className="max-w-[1000px]"><QuestionForm {...args as any} ></QuestionForm></div>

export const Default = Template.bind({});
Default.args = {
}


