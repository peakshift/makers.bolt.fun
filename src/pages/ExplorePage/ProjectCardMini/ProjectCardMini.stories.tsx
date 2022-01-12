import { ComponentStory, ComponentMeta } from '@storybook/react';
import mockData from 'src/api/mockData.json'

import ProjectCardMini from './ProjectCardMini';
import ProjectCardMiniSkeleton from './ProjectCardMini.Skeleton';


export default {
    title: 'Explore Page/Project Card Mini',
    component: ProjectCardMini,

} as ComponentMeta<typeof ProjectCardMini>;

const Template: ComponentStory<typeof ProjectCardMini> = (args) => <ProjectCardMini {...args} />;

export const Default = Template.bind({});
Default.args = {
    project: mockData.projectsCards[0]
}



const SkeletonTemplate: ComponentStory<typeof ProjectCardMiniSkeleton> = (args) => <ProjectCardMiniSkeleton />;

export const LoadingState = SkeletonTemplate.bind({});
LoadingState.args = {
}



