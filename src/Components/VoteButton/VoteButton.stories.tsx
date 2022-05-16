import { ComponentStory, ComponentMeta } from '@storybook/react';
import { centerDecorator } from 'src/utils/storybook/decorators';

import VoteButton from './VoteButton';

export default {
    title: 'Shared/Vote Button',
    component: VoteButton,
    decorators: [
        centerDecorator
    ]

} as ComponentMeta<typeof VoteButton>;

const Template: ComponentStory<typeof VoteButton> = (args) => <VoteButton {...args} />;


export const Default = Template.bind({});
Default.args = {
    initVotes: 540,
    onVote: () => { }
}