import { ComponentStory, ComponentMeta } from '@storybook/react';
import TeamTab from './TeamTab';

export default {
    title: 'Projects/List Project Page/Tabs/Team',
    component: TeamTab,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof TeamTab>;


const Template: ComponentStory<typeof TeamTab> = (args) => <TeamTab {...args as any} ></TeamTab>


export const Default = Template.bind({});
Default.args = {
}


