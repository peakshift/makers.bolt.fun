import { ComponentStory, ComponentMeta } from '@storybook/react';

import TipButton from './TipButton';
import { centerDecorator } from 'src/utils/storybookDecorators'

export default {
  title: 'Shared/Tip Button',
  component: TipButton,
  decorators: [
    centerDecorator
  ]
} as ComponentMeta<typeof TipButton>;

const Template: ComponentStory<typeof TipButton> = (args) => <TipButton onTip={() => { }} />;

export const Default = Template.bind({});

