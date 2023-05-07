import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./apollo";
import { useAppDispatch, useResizeListener } from "./hooks";
import { useCallback, useLayoutEffect } from "react";
import { setIsMobileDevice } from "src/redux/features/ui.slice";
import { isMobileDevice } from "./helperFunctions";
import { Tooltip } from "react-tooltip";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-tooltip/dist/react-tooltip.css";
import THEME from "./theme";
import { NotificationsService } from "src/services";
import ErrorPage from "src/Components/Errors/ErrorPage/ErrorPage";
import { ErrorBoundary } from "react-error-boundary";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { SideNavigationProvider } from "src/Components/SideNavigation";
import { getStore } from "src/redux/store";

THEME.injectStyles();
dayjs.extend(relativeTime);

let basename = "/";

if (process.env.REACT_APP_FOR_GITHUB) basename = "/makers.bolt.fun/";

export const useWrapperSetup = () => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    // Setting CSS Vars
    let root = document.documentElement;
    root.style.setProperty("--primary", THEME.colors.primary[500]);
    // root.style.setProperty('--secondary', THEME.colors.secondary[500]);
  }, []);

  const resizeListener = useCallback(() => {
    dispatch(setIsMobileDevice(isMobileDevice()));
  }, [dispatch]);

  useResizeListener(resizeListener);
};

export default function Wrapper(props: any) {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <ApolloProvider client={apolloClient}>
          <SideNavigationProvider>
          <Provider store={getStore()}>{props.children}</Provider>
          </SideNavigationProvider>
        </ApolloProvider>
      </ErrorBoundary>
      <Tooltip delayShow={1000} />
      <ToastContainer
        {...NotificationsService.defaultOptions}
        newestOnTop={false}
        limit={2}
      />
    </>
  );
}
