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
    votes: 540,
    onVote: () => { }
}

export const Vertical = Template.bind({});
Vertical.args = {
    votes: 540,
    onVote: () => { },
    direction: 'vertical'
}

export const Dense = Template.bind({});
Dense.args = {
    votes: 540,
    onVote: () => { },
    dense: true
}

export const FillTypeUpdown = Template.bind({});
FillTypeUpdown.args = {
    votes: 540,
    onVote: () => { },
    fillType: 'upDown'
}

export const FillTypeBackground = Template.bind({});
FillTypeBackground.args = {
    votes: 540,
    onVote: () => { },
    fillType: 'background'
}

export const FillTypeRadial = Template.bind({});
FillTypeRadial.args = {
    votes: 540,
    onVote: () => { },
    fillType: 'radial'
}

export const NoCounter = Template.bind({});
NoCounter.args = {
    votes: 540,
    onVote: () => { },
    disableCounter: true,
}

export const CounterReset = Template.bind({});
CounterReset.args = {
    votes: 540,
    onVote: () => { },
    resetCounterOnRelease: true
}

export const NoShake = Template.bind({});
NoShake.args = {
    votes: 540,
    onVote: () => { },
    disableShake: true,
}