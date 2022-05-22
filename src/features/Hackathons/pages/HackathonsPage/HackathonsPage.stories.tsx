import { ComponentStory, ComponentMeta } from '@storybook/react';

import HackathonsPage from './HackathonsPage';

export default {
    title: 'Hackathons/Hackathons Page/Page',
    component: HackathonsPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof HackathonsPage>;


const Template: ComponentStory<typeof HackathonsPage> = (args) => <HackathonsPage {...args as any} ></HackathonsPage>

export const Default = Template.bind({});
Default.args = {
}


