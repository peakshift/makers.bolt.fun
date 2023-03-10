import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MOCK_DATA } from "src/mocks/data";
import AccountCard from "./LinkedAccountsCard";

export default {
  title: "Profiles/Edit Profile Page/Linked Wallets Card",
  component: AccountCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AccountCard>;

const Template: ComponentStory<typeof AccountCard> = (args) => (
  <AccountCard {...args}></AccountCard>
);

export const Default = Template.bind({});
Default.args = {
  value: MOCK_DATA["user"].private_data.walletsKeys,
  onChange: () => {},
};
