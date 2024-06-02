import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MOCK_DATA } from "src/mocks/data";

import AuthorCard from "./AuthorCard";

export default {
  title: "Posts/Post Details Page/Components/AuthorCard",
  component: AuthorCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AuthorCard>;

const Template: ComponentStory<typeof AuthorCard> = (args) => (
  <div className="max-w-[326px]">
    <AuthorCard {...(args as any)}></AuthorCard>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  author: MOCK_DATA["posts"].stories[0].author!,
};
