import { QueryClient, QueryClientProvider } from 'react-query'
import 'react-multi-carousel/lib/styles.css';
import { Provider } from 'react-redux';
import { store } from '../redux/store';


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
