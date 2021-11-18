import { QueryClient, QueryClientProvider } from 'react-query'

import { Provider } from 'react-redux';
import { store } from '../redux/store';

import 'react-multi-carousel/lib/styles.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


const queryClient = new QueryClient()

export default function Wrapper(props: any) {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                {props.children}
            </Provider>
        </QueryClientProvider>
    )
}
