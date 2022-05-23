import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';

import StoryCard from './StoryCard';

export default {
    title: 'Posts/Components/StoryCard',
    component: StoryCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof StoryCard>;


const Template: ComponentStory<typeof StoryCard> = (args) => <div className="max-w-[70ch]"><StoryCard {...args} ></StoryCard></div>

export const Default = Template.bind({});
Default.args = {
    story: MOCK_DATA['posts'].stories[0]
}


