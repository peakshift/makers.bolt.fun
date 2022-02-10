import "../src/index.css";
import { configure, addDecorator } from "@storybook/react";
import { store } from "../src/redux/store";
import React from "react";
import { Provider } from "react-redux";


import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";



import "react-multi-carousel/lib/styles.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'react-loading-skeleton/dist/skeleton.css'

import { BrowserRouter } from "react-router-dom";


const client = new ApolloClient({
  uri: 'https://xenodochial-goldstine-d09942.netlify.app/.netlify/functions/graphql',
  cache: new InMemoryCache()
});

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

  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <S />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
));

configure(require.context("../src", true, /\.stories\.ts$/), module);
