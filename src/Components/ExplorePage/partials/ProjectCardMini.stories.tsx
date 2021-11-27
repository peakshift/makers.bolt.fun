import { ComponentStory, ComponentMeta } from '@storybook/react';
import mockData from 'src/api/mockData.json'

import ProjectCardMini from './ProjectCardMini';


export default {
    title: 'Explore Page/Project Card Mini',
    component: ProjectCardMini,

} as ComponentMeta<typeof ProjectCardMini>;

const Template: ComponentStory<typeof ProjectCardMini> = (args) => <ProjectCardMini {...args} />;

export const Default = Template.bind({});
Default.args = {
    project: mockData.projectsCards[0]
}



