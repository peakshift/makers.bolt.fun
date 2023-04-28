import React, { ReactElement } from "react";
import { render as _render, RenderOptions } from "@testing-library/react";
import { createReduxStore } from "src/redux/store";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../apollo";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { NotificationsService } from "src/services";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);

const render = (
  ui: ReactElement,
  providersOptions?: Parameters<typeof createProviders>[0],
  options?: Omit<RenderOptions, "wrapper">
) => {
  return _render(ui, {
    wrapper: createProviders({
      ...providersOptions,
      customWrapper: providersOptions?.customWrapper,
    }),
    ...options,
  });
};

const createCustomRenderer = (options?: {}) => {
  return (ui: ReactElement) => _render(ui, options);
};

const createProviders =
  (
    config?: Partial<{
      reduxStoreInitialData: Parameters<typeof createReduxStore>[0];
      customWrapper: RenderOptions["wrapper"];
    }>
  ) =>
  ({ children }: { children: React.ReactNode }) => {
    const store = createReduxStore(config?.reduxStoreInitialData);

    const routes = [
      {
        path: "/",
        element: children,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });
    const defaultWrapper = ({ children }: { children: JSX.Element }) => (
      <>{children}</>
    );

    const CustomWrapper = config?.customWrapper || defaultWrapper;

    return (
      <CustomWrapper>
        <>
          <ApolloProvider client={apolloClient}>
            <ReduxProvider store={store}>
              <RouterProvider router={router} />
            </ReduxProvider>
          </ApolloProvider>
          <ToastContainer
            {...NotificationsService.defaultOptions}
            newestOnTop={false}
            limit={2}
          />
        </>
      </CustomWrapper>
    );
  };

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { render, createCustomRenderer };
