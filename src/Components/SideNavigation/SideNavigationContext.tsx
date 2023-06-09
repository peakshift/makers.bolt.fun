import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import DefaultSideNavigation from "./DefaultSideNavigation";

const SideNavigationContext = createContext<{
  renderSideNav: () => React.ReactNode;
  setCurrentSideNav: (renderSideNav: () => React.ReactNode) => void;
}>(undefined!);

export function SideNavigationProvider(props: PropsWithChildren<{}>) {
  const [renderFuncsStack, setRenderFuncsStack] = useState(
    [] as (() => React.ReactNode)[]
  );

  const setCurrentSideNav = useCallback(
    (renderSideNav: () => React.ReactNode) => {
      setRenderFuncsStack((prev) => [...prev, renderSideNav]);

      return () => {
        setRenderFuncsStack((prev) => prev.slice(0, -1));
      };
    },
    []
  );

  const whatToRender =
    renderFuncsStack[renderFuncsStack.length - 1] || DefaultSideNavigation;

  return (
    <SideNavigationContext.Provider
      value={{ renderSideNav: whatToRender, setCurrentSideNav }}
    >
      {props.children}
    </SideNavigationContext.Provider>
  );
}

const useSideNavigation = () => {
  const value = React.useContext(SideNavigationContext);
  if (value === undefined) {
    throw new Error(
      "useSideNavigation must be used within a SideNavigationProvider"
    );
  }
  return value;
};

export function SideNavigation() {
  const { renderSideNav } = useSideNavigation();

  return <>{renderSideNav ? renderSideNav() : null}</>;
}

SideNavigation.Override = function Override(props: PropsWithChildren<{}>) {
  const { setCurrentSideNav } = useSideNavigation();

  useEffect(() => {
    return setCurrentSideNav(() => props.children);
  }, [props.children, setCurrentSideNav]);

  return null;
};
