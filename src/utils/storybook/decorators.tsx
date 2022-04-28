import { DecoratorFn } from '@storybook/react';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createReduxStore } from 'src/redux/store';
import { useWrapperSetup } from '../Wrapper';
import { ModifyArgs } from './utils';
import Modal from 'src/Components/Modals/Modal/Modal';
import { worker } from 'src/mocks/browser'
import { AnimatePresence, motion } from 'framer-motion';
import ReactTooltip from 'react-tooltip';

// Add the global stuff first (index.ts)
// -------------------------------------------
import "src/styles/index.scss";
import "react-multi-carousel/lib/styles.css";
import 'react-loading-skeleton/dist/skeleton.css'
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../apollo';
import { FormProvider, useForm, UseFormProps } from 'react-hook-form';


// Enable the Mocks Service Worker
// -------------------------------------------

if (process.env.STORYBOOK_ENABLE_MOCKS) {
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
        <>
            <ApolloProvider client={apolloClient}>
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
            <ReactTooltip
                effect='solid'
                delayShow={1000}
            />
        </>
    );
}

// This adds the stuff and setup that usually goes in the App.tsx
export const AppDecorator: DecoratorFn = (Component) => {
    useWrapperSetup();

    return <Component />
}

export const wrapModal: DecoratorFn = (Component) => <Modal isOpen onClose={() => { }}><Component /></Modal>

export const wrapPage: DecoratorFn = (Component) => <div className='page-container'><Component /></div>



export const ModalsDecorator: DecoratorFn = (Story) => {
    const onClose = () => { };
    return (
        <motion.div
            className="w-screen fixed inset-0 overflow-x-hidden z-[2020]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: { ease: "easeInOut" },
            }}
        >
            <AnimatePresence>
                <Modal onClose={onClose}  >
                    <Story onClose={onClose} />
                </Modal>
            </AnimatePresence>
        </motion.div>
    );
}

export const centerDecorator: DecoratorFn = (Story) => {
    return <div className="min-h-screen flex justify-center items-center">
        <Story />
    </div>
}

export const WrapForm: (options?: Partial<UseFormProps>) => DecoratorFn = options => {
    const Func: DecoratorFn = (Story) => {
        const methods = useForm(options);
        return <FormProvider {...methods} >
            <Story />
        </FormProvider>
    }
    return Func
}

