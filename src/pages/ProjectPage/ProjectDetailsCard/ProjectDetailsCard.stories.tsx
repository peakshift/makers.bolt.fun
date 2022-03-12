import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProjectDetailsCard from './ProjectDetailsCard';
import ProjectDetailsCardSkeleton from './ProjectDetailsCard.Skeleton';

import { ModalsDecorator } from 'src/utils/storybookDecorators'

export default {
    title: 'Project/Project Details Card',
    component: ProjectDetailsCard,

    decorators: [ModalsDecorator]
} as ComponentMeta<typeof ProjectDetailsCard>;

const Template: ComponentStory<typeof ProjectDetailsCard> = (args) => <ProjectDetailsCard {...args} />;

export const Default = Template.bind({
});

Default.args = {
    projectId: '3'
}



const LoadingTemplate: ComponentStory<typeof ProjectDetailsCardSkeleton> = (args) => <ProjectDetailsCardSkeleton {...args} />;
export const LoadingState = LoadingTemplate.bind({})