import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

const Context = createContext<{
  renderSideNav: () => React.ReactNode;
  setRenderSideNav: (
    compId: string,
    renderSideNav: () => React.ReactNode
  ) => void;
}>(undefined!);

export default function SideNavigationProvider(props: PropsWithChildren<{}>) {
  const [componentSideNav, setComponentSideNav] = useState<
    Record<string, () => React.ReactNode>
  >({});

  const compsIdsStack = useRef([] as string[]);

  const setRenderSideNav = useCallback(
    (compId: string, renderSideNav: () => React.ReactNode) => {
      setComponentSideNav((prev) => ({
        ...prev,
        [compId]: renderSideNav,
      }));

      compsIdsStack.current.push(compId);

      return () => {
        compsIdsStack.current = compsIdsStack.current.filter(
          (id) => id !== compId
        );
      };
    },
    []
  );

  const whatToRender =
    componentSideNav[compsIdsStack.current[compsIdsStack.current.length - 1]];

  return (
    <Context.Provider value={{ renderSideNav: whatToRender, setRenderSideNav }}>
      {props.children}
    </Context.Provider>
  );
}

const useSideNavigation = () => {
  const value = React.useContext(Context);
  if (value === undefined) {
    throw new Error(
      "useSideNavigation must be used within a SideNavigationProvider"
    );
  }
  return value;
};

export function SideNavigation(props: PropsWithChildren<{}>) {
  const { renderSideNav, setRenderSideNav } = useSideNavigation();
  const componentId = useId();

  useEffect(() => {
    setRenderSideNav(componentId, () => props.children);
  }, [componentId, props.children, setRenderSideNav]);

  return (
    <nav className="md:overflow-y-auto sticky-side-element flex flex-col gap-16 md:gap-24">
      {renderSideNav && renderSideNav()}
    </nav>
  );
}

SideNavigation.Override = function Override(props: PropsWithChildren<{}>) {
  const { setRenderSideNav } = useSideNavigation();
  const componentId = useId();

  useEffect(() => {
    setRenderSideNav(componentId, () => props.children);
  }, [componentId, props.children, setRenderSideNav]);

  return null;
};
