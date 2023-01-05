import { ComponentStory, ComponentMeta } from "@storybook/react";

import FeedTags from "./FeedTagsFilter";

export default {
  title: "Posts/Feed Page/Components/Feed Tags Filter",
  component: FeedTags,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof FeedTags>;

const Template: ComponentStory<typeof FeedTags> = (args) => (
  <div className="max-w-[326px]">
    <FeedTags {...(args as any)}></FeedTags>
  </div>
);

export const Default = Template.bind({});
Default.args = {};
