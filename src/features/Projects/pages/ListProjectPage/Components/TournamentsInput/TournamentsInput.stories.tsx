import { ComponentStory, ComponentMeta } from '@storybook/react';
import { WrapFormController } from 'src/utils/storybook/utils';
import TournamentsInput from './TournamentsInput';

export default {
    title: 'Projects/List Project Page/Inputs/Tournaments Input',
    component: TournamentsInput,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof TournamentsInput>;


const Template: ComponentStory<typeof TournamentsInput> = (args) => WrapFormController('v', [])(<TournamentsInput {...args as any} ></TournamentsInput>)


export const Default = Template.bind({});
Default.args = {
}


