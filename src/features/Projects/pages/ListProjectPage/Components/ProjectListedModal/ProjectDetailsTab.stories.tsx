import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProjectListedModal from './ProjectListedModal';

export default {
    title: 'Projects/List Project Page/Modals/Project Listed Modal',
    component: ProjectListedModal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProjectListedModal>;


const Template: ComponentStory<typeof ProjectListedModal> = (args) => <ProjectListedModal {...args as any} ></ProjectListedModal>


export const Default = Template.bind({});
Default.args = {
    project: {
        id: 12,
        name: "BOLT FUN",
        img: "https://picsum.photos/id/870/150/150.jpg",
        tagline: "An awesome directory for lightning projects and makers"
    }
}


