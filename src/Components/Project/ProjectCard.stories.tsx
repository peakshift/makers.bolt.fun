import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProjectCard from './ProjectCard';

import { ModalsDecorator } from '.storybook/helpers'

export default {
    title: 'Project/Project Card',
    component: ProjectCard,

    decorators: [ModalsDecorator]
} as ComponentMeta<typeof ProjectCard>;

const Template: ComponentStory<typeof ProjectCard> = (args) => <ProjectCard {...args} />;

export const Default = Template.bind({});

