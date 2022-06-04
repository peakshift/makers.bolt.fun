import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';
import AboutCard from './AboutCard';

export default {
    title: 'Profiles/Profile Page/About Card',
    component: AboutCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },

} as ComponentMeta<typeof AboutCard>;


const Template: ComponentStory<typeof AboutCard> = (args) => <AboutCard {...args} ></AboutCard>

export const Default = Template.bind({});
Default.args = {
    user: MOCK_DATA['user']
}

export const Empty = Template.bind({});
Empty.args = {
    user: {
        name: MOCK_DATA['user'].name,
        avatar: MOCK_DATA['user'].avatar,
    } as any
}

export const EmptyOwner = Template.bind({});
EmptyOwner.args = {
    user: {
        name: MOCK_DATA['user'].name,
        avatar: MOCK_DATA['user'].avatar,
    } as any,
    isOwner: true
}