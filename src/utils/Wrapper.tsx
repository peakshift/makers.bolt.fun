import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

import 'react-multi-carousel/lib/styles.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'react-loading-skeleton/dist/skeleton.css'


import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client";
import { useAppDispatch, useResizeListener } from './hooks';
import { useCallback, useLayoutEffect } from 'react';
import { setIsMobileScreen } from 'src/redux/features/ui.slice';
import { isMobileScreen } from './helperFunctions';

let apiClientUri = '/.netlify/functions/graphql';

if (process.env.REACT_APP_API_END_POINT)
    apiClientUri = process.env.REACT_APP_API_END_POINT


const client = new ApolloClient({
    uri: apiClientUri,
    cache: new InMemoryCache()
});


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
        <ApolloProvider client={client}>
            <Provider store={store}>
                <BrowserRouter basename={basename}>
                    {props.children}
                </BrowserRouter>
            </Provider>
        </ApolloProvider>
    )
}
