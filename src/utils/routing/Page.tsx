import * as React from 'react';
import { usePage } from './usePage';

interface LoadablePagePageProps { }

const LoadablePage: React.FC<React.PropsWithChildren<LoadablePagePageProps>> = ({ children }) => {
    const { onLoad } = usePage();

    const render = React.useMemo(() => {
        return <>{children}</>;
    }, [children]);

    React.useEffect(() => {
        onLoad(render);
    }, [onLoad, render]);


    return render;
};

export default LoadablePage;