import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MOCK_DATA } from "src/mocks/data";

import CommentCard from "./CommentCard";

export default {
  title: "Posts/Components/Comments/CommentCard",
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
  <div className="max-w-[70ch]">
    <CommentCard {...args}></CommentCard>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  comment: MOCK_DATA.generatePostComments(1)[0] as any,
};
