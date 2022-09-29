import { ComponentStory, ComponentMeta } from '@storybook/react';
import { WrapFormController } from 'src/utils/storybook/utils';
import RecruitRolesInput from './RecruitRolesInput';

export default {
    title: 'Projects/List Project Page/Inputs/Recruiter Roles Input',
    component: RecruitRolesInput,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof RecruitRolesInput>;


const Template: ComponentStory<typeof RecruitRolesInput> = (args) => WrapFormController('v', [])(<RecruitRolesInput {...args as any} ></RecruitRolesInput>)


export const Default = Template.bind({});
Default.args = {
}


