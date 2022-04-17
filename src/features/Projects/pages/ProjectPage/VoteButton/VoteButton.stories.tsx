import { ComponentStory, ComponentMeta } from '@storybook/react';

import VoteButton from './VoteButton';
import { centerDecorator } from 'src/utils/storybook/decorators';

export default {
  title: 'Project/Tip Button',
  component: VoteButton,
  decorators: [
    centerDecorator
  ]
} as ComponentMeta<typeof VoteButton>;

const Template: ComponentStory<typeof VoteButton> = (args) => <VoteButton onVote={() => { }} />;

export const Default = Template.bind({});

