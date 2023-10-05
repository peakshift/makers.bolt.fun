import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MOCK_DATA } from "src/mocks/data";
import EmailCard from "./LinkedEmailsCard";

export default {
  title: "Profiles/Edit Profile Page/Linked Emails Card",
  component: EmailCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof EmailCard>;

const Template: ComponentStory<typeof EmailCard> = (args) => (
  <EmailCard {...args}></EmailCard>
);

export const Default = Template.bind({});
Default.args = {
  value: MOCK_DATA["user"].private_data.emails,
  onChange: () => {},
};
