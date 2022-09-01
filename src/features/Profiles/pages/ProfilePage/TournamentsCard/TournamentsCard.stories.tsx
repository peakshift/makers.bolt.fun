import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';
import TournamentsCard from './TournamentsCard';

export default {
    title: 'Profiles/Profile Page/Tournaments Card',
    component: TournamentsCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },

} as ComponentMeta<typeof TournamentsCard>;


const Template: ComponentStory<typeof TournamentsCard> = (args) => <div className="max-w-[326px]"><TournamentsCard {...args} ></TournamentsCard></div>

export const Default = Template.bind({});
Default.args = {
    tournaments: MOCK_DATA['user'].tournaments
}

export const Empty = Template.bind({});
Empty.args = {
    tournaments: [],
}

export const EmptyOwner = Template.bind({});
EmptyOwner.args = {
    tournaments: [],
    isOwner: true
}