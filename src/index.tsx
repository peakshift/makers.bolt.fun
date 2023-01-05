import React from "react";
import ReactDOM from "react-dom/client";
import Wrapper from "./utils/Wrapper";
import "./styles/index.scss";
import { RootRouter } from "./utils/routing/rootRouter";

if (process.env.REACT_APP_ENABLE_MOCKS) {
  import(/* webpackChunkName: "mocks_server" */ "./mocks/browser").then(
    ({ worker }) => {
      worker.start({
        onUnhandledRequest: "bypass",
      });
    }
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Wrapper>
      <RootRouter />
    </Wrapper>
  </React.StrictMode>
);
