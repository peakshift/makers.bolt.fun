import React, { FC, ReactElement } from "react";
import { render as _render, RenderOptions } from "@testing-library/react";
import { createReduxStore } from "src/redux/store";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../apollo";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { NotificationsService } from "src/services";

const render = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) => {
  return _render(ui, { wrapper: createProviders, ...options });
};

const createCustomRenderer = (options?: {}) => {
  return (ui: ReactElement) => _render(ui, options);
};

const createProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = createReduxStore(undefined);

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <ReduxProvider store={store}>{children}</ReduxProvider>
      </ApolloProvider>
      <ToastContainer
        {...NotificationsService.defaultOptions}
        newestOnTop={false}
        limit={2}
      />
    </>
  );
};

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { render, createCustomRenderer };
