import { ComponentStory, ComponentMeta } from '@storybook/react';
import mockData from 'src/api/mockData.json'

import ProjectsRow from './ProjectsRow';
import { MdLocalFireDepartment } from 'react-icons/md';


export default {
    title: 'Explore Page/ProjectsRow',
    component: ProjectsRow,

} as ComponentMeta<typeof ProjectsRow>;

const Template: ComponentStory<typeof ProjectsRow> = (args) => <ProjectsRow {...args} />;

export const Hottest = Template.bind({});
Hottest.args = {
    title: <>
        Hottest
        <MdLocalFireDepartment
            className='inline-block text-fire align-bottom scale-125 ml-4 origin-bottom'
        /></>,
    categoryId: 2,
    projects: mockData.projectsCards
}

export const Defi = Template.bind({});
Defi.args = {
    title: 'DeFi',
    categoryId: 33,
    projects: mockData.projectsCards
}

