import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Post_Type } from 'src/graphql';
import { WithModals, WrapForm } from 'src/utils/storybook/decorators';
import { IStoryFormInputs } from '../../CreateStoryPage/CreateStoryPage';

import DraftsContainer from './DraftsContainer';

export default {
    title: 'Posts/Create Post Page/Drafts Container',
    component: DraftsContainer,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [WithModals, WrapForm<IStoryFormInputs>({
        defaultValues: {
            tags: [],
        }
    })]
} as ComponentMeta<typeof DraftsContainer>;


const Template: ComponentStory<typeof DraftsContainer> = (args) => <div className="max-w-[1000px]"><DraftsContainer {...args as any} ></DraftsContainer></div>

export const Default = Template.bind({});
Default.args = {
    type: Post_Type.Story
}


