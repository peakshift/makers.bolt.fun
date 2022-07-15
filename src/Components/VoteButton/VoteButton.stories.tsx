import { ComponentStory, ComponentMeta } from '@storybook/react';
import { centerDecorator } from 'src/utils/storybook/decorators';
import { ComponentProps } from 'react'

import VoteButton from './VoteButton';

export default {
    title: 'Shared/Vote Button',
    component: VoteButton,
    decorators: [
        centerDecorator
    ]

} as ComponentMeta<typeof VoteButton>;

const Template: ComponentStory<typeof VoteButton> = (args) => <VoteButton {...args} />;

const onVoteHandler: ComponentProps<typeof VoteButton>['onVote'] = (a, c) => {
    setTimeout(() => {
        c.onSuccess?.();
        c.onSetteled?.();
    }, 2000)
}

export const Default = Template.bind({});
Default.args = {
    votes: 540,
    onVote: onVoteHandler
}

export const Vertical = Template.bind({});
Vertical.args = {
    votes: 540,
    onVote: onVoteHandler,
    direction: 'vertical'
}

export const Dense = Template.bind({});
Dense.args = {
    votes: 540,
    onVote: onVoteHandler,
    dense: true
}

export const FillTypeUpdown = Template.bind({});
FillTypeUpdown.args = {
    votes: 540,
    onVote: onVoteHandler,
    fillType: 'upDown'
}

export const FillTypeBackground = Template.bind({});
FillTypeBackground.args = {
    votes: 540,
    onVote: onVoteHandler,
    fillType: 'background'
}

export const FillTypeRadial = Template.bind({});
FillTypeRadial.args = {
    votes: 540,
    onVote: onVoteHandler,
    fillType: 'radial'
}

export const NoCounter = Template.bind({});
NoCounter.args = {
    votes: 540,
    onVote: onVoteHandler,
    disableCounter: true,
}

export const CounterReset = Template.bind({});
CounterReset.args = {
    votes: 540,
    onVote: onVoteHandler,
    resetCounterOnRelease: true
}

export const NoShake = Template.bind({});
NoShake.args = {
    votes: 540,
    onVote: onVoteHandler,
    disableShake: true,
}