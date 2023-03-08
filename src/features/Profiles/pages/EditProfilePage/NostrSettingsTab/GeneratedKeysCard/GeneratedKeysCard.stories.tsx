import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MOCK_DATA } from "src/mocks/data";
import GeneratedKeysCard from "./GeneratedKeysCard";

export default {
  title: "Profiles/Edit Profile Page/Generated Keys Card",
  component: GeneratedKeysCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof GeneratedKeysCard>;

const Template: ComponentStory<typeof GeneratedKeysCard> = (args) => (
  <GeneratedKeysCard {...args}></GeneratedKeysCard>
);

export const Default = Template.bind({});
Default.args = {
  nostr_prv_key: "1234389753205473258327580937245",
  nostr_pub_key: "55234231277835473258327580937245",
};
