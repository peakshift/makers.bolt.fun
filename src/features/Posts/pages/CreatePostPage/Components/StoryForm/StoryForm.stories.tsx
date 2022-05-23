import { ComponentStory, ComponentMeta } from '@storybook/react';
import { WithModals } from 'src/utils/storybook/decorators';

import StoryForm from './StoryForm';

export default {
    title: 'Posts/Create Post Page/Story Form',
    component: StoryForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [WithModals]
} as ComponentMeta<typeof StoryForm>;


const Template: ComponentStory<typeof StoryForm> = (args) => <div className="max-w-[1000px]"><StoryForm {...args as any} ></StoryForm></div>

export const Default = Template.bind({});
Default.args = {
}


