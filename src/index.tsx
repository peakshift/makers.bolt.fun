import React from 'react';
import ReactDOM from 'react-dom/client';
import Wrapper from './utils/Wrapper';
import './index.scss';
import App from './App';


if (process.env.REACT_APP_ENABLE_MOCKS) {
  const { worker } = require('./mocks/browser')
  worker.start({
    onUnhandledRequest: 'bypass'
  })
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Wrapper>
      <App />
    </Wrapper>
  </React.StrictMode>
);

