import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProjectCard from './ProjectCard';
import ProjectCardSkeleton from './ProjectCard.Skeleton';

import { ModalsDecorator } from '.storybook/helpers'

export default {
    title: 'Project/Project Card',
    component: ProjectCard,

    decorators: [ModalsDecorator]
} as ComponentMeta<typeof ProjectCard>;

const Template: ComponentStory<typeof ProjectCard> = (args) => <ProjectCard {...args} />;

export const Default = Template.bind({});



const LoadingTemplate: ComponentStory<typeof ProjectCardSkeleton> = (args) => <ProjectCardSkeleton {...args} />;
export const LoadingState = LoadingTemplate.bind({})