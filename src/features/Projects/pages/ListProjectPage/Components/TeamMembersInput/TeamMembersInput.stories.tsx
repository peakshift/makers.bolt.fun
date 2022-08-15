import { ComponentStory, ComponentMeta } from '@storybook/react';
import { WrapFormController } from 'src/utils/storybook/utils';
import TeamMembersInput from './TeamMembersInput';

export default {
    title: 'Projects/List Project Page/Inputs/Team Members Input',
    component: TeamMembersInput,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof TeamMembersInput>;


const Template: ComponentStory<typeof TeamMembersInput> = (args) => WrapFormController('v', [])(<TeamMembersInput {...args as any} ></TeamMembersInput>)


export const Default = Template.bind({});
Default.args = {
}


