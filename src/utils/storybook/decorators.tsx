import { DecoratorFn } from '@storybook/react';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createReduxStore } from 'src/redux/store';
import { useWrapperSetup } from '../Wrapper';
import { ModifyArgs } from './utils';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Modal from 'src/Components/Modals/Modal/Modal';
import { worker } from 'src/mocks/browser'

// Add the global stuff first (index.ts)
// -------------------------------------------

import "react-multi-carousel/lib/styles.css";
import 'react-loading-skeleton/dist/skeleton.css'

if (process.env.NODE_ENV === 'development') {
    worker.start({
        onUnhandledRequest: 'bypass'
    })
}

// -------------------------------------------
// -------------------------------------------


let apiClientUri = 'https://makers-bolt-fun-preview.netlify.app/.netlify/functions/graphql';

if (process.env.REACT_APP_API_END_POINT)
    apiClientUri = process.env.REACT_APP_API_END_POINT

const client = new ApolloClient({
    uri: apiClientUri,
    cache: new InMemoryCache()
});


if (process.env.NODE_ENV === 'development') {
    worker.start({
        onUnhandledRequest: 'bypass'
    })
}



// This adds the stuff and setup that usually goes in the Wrapper.tsx
export const WrapperDecorator: DecoratorFn = (Story, options) => {
    const { parameters } = options;

    const modifyArgs: ModifyArgs = parameters?.modifyArgs ?? {}
    modifyArgs.router = modifyArgs.router ?? {
        routePath: '/route',
        currentPath: "/route",
    }


    const store = createReduxStore(modifyArgs.store ?? undefined);


    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <Suspense fallback={<h2>Loading</h2>}>
                    <MemoryRouter initialEntries={[modifyArgs.router?.currentPath!]}>
                        <Routes>
                            <Route path={modifyArgs.router?.routePath} element={<Story {...options} />} />
                        </Routes>
                    </MemoryRouter>
                </Suspense>
            </Provider>
        </ApolloProvider>
    );
}

// This adds the stuff and setup that usually goes in the App.tsx
export const AppDecorator: DecoratorFn = (Component) => {
    useWrapperSetup();

    return <Component />
}

export const wrapModal: DecoratorFn = (Component) => <Modal isOpen onClose={() => { }}><Component /></Modal>

export const wrapPage: DecoratorFn = (Component) => <div className='page-container'><Component /></div>

