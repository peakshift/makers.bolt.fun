import { ComponentStory, ComponentMeta } from "@storybook/react";

import { LandingPage } from "./LandingPage";

export default {
  title: "LandingPage",
  component: LandingPage,
} as ComponentMeta<typeof LandingPage>;

const Template: ComponentStory<typeof LandingPage> = () => <LandingPage />;

export const Default = Template.bind({});
Default.args = {};
