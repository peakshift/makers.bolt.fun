import { ComponentStory, ComponentMeta } from "@storybook/react";

import { EventsPage } from "./EventsPage";

export default {
  title: "Events",
  component: EventsPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof EventsPage>;

const Template: ComponentStory<typeof EventsPage> = (args) => (
  <EventsPage {...(args as any)}></EventsPage>
);

export const Default = Template.bind({});
Default.args = {};
