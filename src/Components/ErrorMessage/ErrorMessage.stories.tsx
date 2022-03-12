import { ComponentStory, ComponentMeta } from '@storybook/react';

import ErrorMessage from './ErrorMessage';

export default {
  title: 'Shared/ErrorMessage',
  component: ErrorMessage,

} as ComponentMeta<typeof ErrorMessage>;

const Template: ComponentStory<typeof ErrorMessage> = (args) => <ErrorMessage {...args} />;

export const Default = Template.bind({});


export const FetchingError = Template.bind({});
FetchingError.args = {
  type: 'fetching'
}

export const CustomMessage = Template.bind({});
CustomMessage.args = {
  message: 'Custom Error Message'
}

