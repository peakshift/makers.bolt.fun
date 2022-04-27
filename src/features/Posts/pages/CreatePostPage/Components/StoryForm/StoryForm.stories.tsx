import { ComponentStory, ComponentMeta } from '@storybook/react';

import StoryForm from './StoryForm';

export default {
    title: 'Posts/Create Post Page/Story Form',
    component: StoryForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof StoryForm>;


const Template: ComponentStory<typeof StoryForm> = (args) => <StoryForm {...args as any} ></StoryForm>

export const Default = Template.bind({});
Default.args = {
}


