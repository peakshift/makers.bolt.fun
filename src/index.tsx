import React from 'react';
import ReactDOM from 'react-dom';
import Wrapper from './utils/Wrapper';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_ENABLE_MOCKS) {
  const { worker } = require('./mocks/browser')
  worker.start({
    onUnhandledRequest: 'bypass'
  })
}



ReactDOM.render(
  <React.StrictMode>
    <Wrapper>
      <App />
    </Wrapper>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
