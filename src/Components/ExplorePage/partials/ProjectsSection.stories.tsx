import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProjectsSection from './ProjectsSection';


export default {
    title: 'Explore Page/Projects Section',
    component: ProjectsSection,

} as ComponentMeta<typeof ProjectsSection>;

const Template: ComponentStory<typeof ProjectsSection> = (args) => <ProjectsSection />;

export const Default = Template.bind({});