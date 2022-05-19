import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';

import HackathonCard from './HackathonCard';
import HackathonCardSkeleton from './HackathonCard.Skeleton';

export default {
    title: 'Hackathons/Components/Hackathon Card',
    component: HackathonCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof HackathonCard>;


const Template: ComponentStory<typeof HackathonCard> = (args) => <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,326px),1fr))]"><HackathonCard {...args} ></HackathonCard></div>

export const Default = Template.bind({});
Default.args = {
    hackathon: MOCK_DATA['hackathons'][0]
}




const LoadingTemplate: ComponentStory<typeof HackathonCard> = (args) => <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,326px),1fr))]"><HackathonCardSkeleton></HackathonCardSkeleton></div>

export const Loading = LoadingTemplate.bind({});
Loading.args = {

}