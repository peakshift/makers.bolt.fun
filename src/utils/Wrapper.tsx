import { store } from '../redux/store';
import { QueryClient, QueryClientProvider } from 'react-query'
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

const client = new ApolloClient({
    uri: 'https://makers.bolt.fun/.netlify/functions/graphql',
    cache: new InMemoryCache()
});
const queryClient = new QueryClient()


const parsedData = window.location.pathname.split("/");
let domain = parsedData[1];




export default function Wrapper(props: any) {


    return (
        <ApolloProvider client={client}>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <BrowserRouter >
                        {props.children}
                    </BrowserRouter>
                </Provider>
            </QueryClientProvider>
        </ApolloProvider>
    )
}
