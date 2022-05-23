import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';

import ProjectCardMini from './ProjectCardMini';
import ProjectCardMiniSkeleton from './ProjectCardMini.Skeleton';


export default {
    title: 'Projects/Components/Project Card Mini',
    component: ProjectCardMini,

} as ComponentMeta<typeof ProjectCardMini>;

const Template: ComponentStory<typeof ProjectCardMini> = (args) => <ProjectCardMini {...args} />;

export const Default = Template.bind({});
Default.args = {
    project: MOCK_DATA.projects[0]
}



const SkeletonTemplate: ComponentStory<typeof ProjectCardMiniSkeleton> = (args) => <ProjectCardMiniSkeleton />;

export const LoadingState = SkeletonTemplate.bind({});
LoadingState.args = {
}



