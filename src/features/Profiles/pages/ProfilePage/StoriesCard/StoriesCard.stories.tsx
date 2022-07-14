import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';
import StoriesCard from './StoriesCard';

export default {
    title: 'Profiles/Profile Page/Stories Card',
    component: StoriesCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },

} as ComponentMeta<typeof StoriesCard>;


const Template: ComponentStory<typeof StoriesCard> = (args) => <StoriesCard {...args} ></StoriesCard>

export const Default = Template.bind({});
Default.args = {
    stories: MOCK_DATA['posts'].stories
}

export const Empty = Template.bind({});
Empty.args = {
    stories: [],
}

export const EmptyOwner = Template.bind({});
EmptyOwner.args = {
    stories: [],
    isOwner: true
}