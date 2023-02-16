import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MOCK_DATA } from "src/mocks/data";

import NostrFeed from "./NostrFeed";

export default {
  title: "Posts/Components/NostrFeed",
  component: NostrFeed,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof NostrFeed>;

const Template: ComponentStory<typeof NostrFeed> = (args) => (
  <div className="max-w-[70ch]">
    <NostrFeed {...args}></NostrFeed>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  topic: "nostr",
};
