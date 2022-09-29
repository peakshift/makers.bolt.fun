import { ComponentStory, ComponentMeta } from '@storybook/react';
import ExtrasTab from './ExtrasTab';

export default {
    title: 'Projects/List Project Page/Tabs/Extras',
    component: ExtrasTab,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ExtrasTab>;


const Template: ComponentStory<typeof ExtrasTab> = (args) => <ExtrasTab {...args as any} ></ExtrasTab>


export const Default = Template.bind({});
Default.args = {
}


