import * as React from 'react';
import LoadingPage from 'src/Components/LoadingPage/LoadingPage';

export type FallbackType = NonNullable<React.ReactNode> | null;

export interface FallbackContextType {
    updateFallback: (fallback: FallbackType) => void;
}

export const FallbackContext = React.createContext<FallbackContextType>({
    updateFallback: () => { },
});

interface FabllbackProviderProps {
}

export const FallbackProvider: React.FC<React.PropsWithChildren<FabllbackProviderProps>> = ({
    children,
}) => {
    const [fallback, setFallback] = React.useState<FallbackType>(null);

    const updateFallback = React.useCallback((fallback: FallbackType) => {
        setFallback(() =>
            <>
                <LoadingPage />
                {fallback}
            </>
        );
    }, []);

    const renderChildren = React.useMemo(() => {
        return children;
    }, [children]);

    return (
        <FallbackContext.Provider value={{ updateFallback }}>
            <React.Suspense fallback={fallback}>{renderChildren}</React.Suspense>
        </FallbackContext.Provider>
    );
};