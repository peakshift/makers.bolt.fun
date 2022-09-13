import { ComponentStory, ComponentMeta } from '@storybook/react';

import ErrorCard from './ErrorCard';

export default {
  title: 'Shared/ErrorCard',
  component: ErrorCard,

} as ComponentMeta<typeof ErrorCard>;

const Template: ComponentStory<typeof ErrorCard> = (args) => <ErrorCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  error: {
    name: "Error Name",
    message: "Error Message",
  }
}


