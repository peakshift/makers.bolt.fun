import { ComponentStory, ComponentMeta } from '@storybook/react';
import { WrapFormController } from 'src/utils/storybook/utils';
import CategoriesInput from './CategoriesInput';

export default {
    title: 'Projects/List Project Page/Inputs/Categories Input',
    component: CategoriesInput,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CategoriesInput>;


const Template: ComponentStory<typeof CategoriesInput> = (args) => WrapFormController('v', [])(<CategoriesInput {...args as any} ></CategoriesInput>)

export const Default = Template.bind({});
Default.args = {
}


