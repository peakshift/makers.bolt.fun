import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MOCK_DATA } from "src/mocks/data";

import NostrPostCard from "./NostrPostCard";

export default {
  title: "Posts/Components/NostrPostCard",
  component: NostrPostCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof NostrPostCard>;

const Template: ComponentStory<typeof NostrPostCard> = (args) => (
  <div className="max-w-[70ch]">
    <NostrPostCard {...args}></NostrPostCard>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  post: {
    created_at: 1676206121,
    pubkey: "eee8f90244589abc852b024493a077522157057e6d565788d8d09473b81d14a9",
    kind: 1,
    content:
      "💜💜💜 perhaps #nostrdesign can come up with ideas on how to better onboard new users to the concept of using Lightning within nostr clients. \n\nI gave it a shot using Damus as the example, but I’m not a designer 👩‍🎨 note1xzldgquwq5wprn3fmd9jecf3aq8r8sqm6xepgszu33a32yk5flnsxynykj",
    sig: "1bcca0971f43422c7b85e46f0919922018f4a7512bb018643a333d41400eadd08f97c885654289c548a099a58f54596dd6d0b0e365e788bd0dfd70efe8a3146a",
    id: "b5c291f3411121ec4d6a8e47af7ad87a0e5a43e1494d0571d2e2ff2548e4acc9",
    tags: [
      ["e", "215a030bb9bf84fc96d5420e7a43fa1241f3750eed73eac9cf2ab9062d7d2a2e"],
      ["p", "1bc70a0148b3f316da33fe3c89f23e3e71ac4ff998027ec712b905cd24f6a411"],
      ["t", "nostrdesign"],
    ],
  },
};
