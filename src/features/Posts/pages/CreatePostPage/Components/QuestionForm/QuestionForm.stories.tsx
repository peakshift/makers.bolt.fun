import { ComponentStory, ComponentMeta } from '@storybook/react';
import { WithModals } from 'src/utils/storybook/decorators';

import QuestionForm from './QuestionForm';

export default {
    title: 'Posts/Create Post Page/Question Form',
    component: QuestionForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [WithModals]
} as ComponentMeta<typeof QuestionForm>;


const Template: ComponentStory<typeof QuestionForm> = (args) => <div className="max-w-[1000px]"><QuestionForm {...args as any} ></QuestionForm></div>

export const Default = Template.bind({});
Default.args = {
}


