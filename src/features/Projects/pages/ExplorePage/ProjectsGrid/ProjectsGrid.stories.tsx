import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { MOCK_DATA } from 'src/mocks/data';

import ProjectsGrid from './ProjectsGrid';

export default {
    title: 'Projects/Category Page/Projects Grid',
    component: ProjectsGrid,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProjectsGrid>;


const Template: ComponentStory<typeof ProjectsGrid> = (args) => <ProjectsGrid {...args} ></ProjectsGrid>

export const Default = Template.bind({});
Default.args = {
    isLoading: false,
    projects: []
}


