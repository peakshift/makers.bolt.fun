import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';

import HackathonsList from './HackathonsList';

export default {
    title: 'Hackathons/Components/HackathonsList',
    component: HackathonsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof HackathonsList>;


const Template: ComponentStory<typeof HackathonsList> = (args) => <HackathonsList {...args} ></HackathonsList>

export const Default = Template.bind({});
Default.args = {
    items: MOCK_DATA['hackathons']
}


