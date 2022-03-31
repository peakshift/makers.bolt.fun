import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from './apollo';
import { useAppDispatch, useResizeListener } from './hooks';
import { useCallback, useLayoutEffect } from 'react';
import { setIsMobileScreen } from 'src/redux/features/ui.slice';
import { isMobileScreen } from './helperFunctions';

import 'react-multi-carousel/lib/styles.css';
import 'react-loading-skeleton/dist/skeleton.css'

let basename = '/';

if (process.env.REACT_APP_FOR_GITHUB)
    basename = '/makers.bolt.fun/'

export const useWrapperSetup = () => {

    const dispatch = useAppDispatch()

    useLayoutEffect(() => {
        // Setting CSS Vars
        let root = document.documentElement;
        // root.style.setProperty('--primary', THEME.colors.primary[500]);
        // root.style.setProperty('--secondary', THEME.colors.secondary[500]);
    }, [])

    const resizeListener = useCallback(() => {
        dispatch(setIsMobileScreen(isMobileScreen()))
    }, [dispatch])

    useResizeListener(resizeListener)
}


export default function Wrapper(props: any) {

    return (
        <ApolloProvider client={apolloClient}>
            <Provider store={store}>
                <BrowserRouter basename={basename}>
                    {props.children}
                </BrowserRouter>
            </Provider>
        </ApolloProvider>
    )
}
