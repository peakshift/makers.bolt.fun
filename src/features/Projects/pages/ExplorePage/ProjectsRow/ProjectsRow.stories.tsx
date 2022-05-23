import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProjectsRow from './ProjectsRow';
import { MdLocalFireDepartment } from 'react-icons/md';
import { MOCK_DATA } from 'src/mocks/data';


export default {
    title: 'Projects/Explore Page/ProjectsRow',
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
    categoryId: 0,
    projects: MOCK_DATA.projects
}

export const Defi = Template.bind({});
Defi.args = {
    title: 'DeFi',
    categoryId: 8,
    projects: MOCK_DATA.projects
}

