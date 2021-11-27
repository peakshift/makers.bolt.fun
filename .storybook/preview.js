import "../src/index.css";
import { configure, addDecorator } from "@storybook/react";
import { store } from "../src/redux/store";
import React from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-multi-carousel/lib/styles.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator((S) => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter>
        <S />
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
));

configure(require.context("../src", true, /\.stories\.ts$/), module);
