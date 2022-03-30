import "../src/index.css";
import { configure, addDecorator } from "@storybook/react";
import { WrapperDecorator, AppDecorator } from 'src/utils/storybook/decorators'


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};



addDecorator(AppDecorator);

addDecorator(WrapperDecorator);




configure(require.context("../src", true, /\.stories\.ts$/), module);
