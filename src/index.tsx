import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Wrapper from './utils/Wrapper';

const client = new ApolloClient({
  uri: 'https://xenodochial-goldstine-d09942.netlify.app/.netlify/functions/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Wrapper>
        <App />
      </Wrapper>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
