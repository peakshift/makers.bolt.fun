import "../src/index.css";
import { configure, addDecorator, addParameters } from "@storybook/react";
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


addParameters({
  backgrounds: {

    default: 'light',
    values: [
      {
        name: 'light',
        value: '#F8FAFC',
      },
      {
        name: 'dark',
        value: '#3f3f4c',
      },
    ],
  }
});


configure(require.context("../src", true, /\.stories\.ts$/), module);
