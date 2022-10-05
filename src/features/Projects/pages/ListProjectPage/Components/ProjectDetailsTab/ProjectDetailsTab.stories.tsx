import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProjectDetailsTab from './ProjectDetailsTab';

export default {
    title: 'Projects/List Project Page/Tabs/Project Details',
    component: ProjectDetailsTab,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProjectDetailsTab>;


const Template: ComponentStory<typeof ProjectDetailsTab> = (args) => <ProjectDetailsTab {...args as any} ></ProjectDetailsTab>


export const Default = Template.bind({});
Default.args = {
}


