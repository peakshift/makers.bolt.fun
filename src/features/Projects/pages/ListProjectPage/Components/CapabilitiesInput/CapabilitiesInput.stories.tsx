import { ComponentStory, ComponentMeta } from '@storybook/react';
import { WrapFormController } from 'src/utils/storybook/utils';
import CapabilitiesInput from './CapabilitiesInput';

export default {
    title: 'Projects/List Project Page/Inputs/Capabilites Input',
    component: CapabilitiesInput,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CapabilitiesInput>;


const Template: ComponentStory<typeof CapabilitiesInput> = (args) => WrapFormController('v', [])(<CapabilitiesInput {...args as any} ></CapabilitiesInput>)


export const Default = Template.bind({});
Default.args = {
}


