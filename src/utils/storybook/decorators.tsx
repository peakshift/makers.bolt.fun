import { DecoratorFn } from '@storybook/react';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createReduxStore } from 'src/redux/store';
import { useWrapperSetup } from '../Wrapper';
import { ModifyArgs } from './utils';
import Modal from 'src/Components/Modals/Modal/Modal';
import { worker } from 'src/mocks/browser'
import ReactTooltip from 'react-tooltip';
import THEME from '../theme';

// Add the global stuff first (index.ts)
// -------------------------------------------
import "src/styles/index.scss";
import 'react-loading-skeleton/dist/skeleton.css'
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../apollo';
import { Controller, FormProvider, useForm, UseFormProps } from 'react-hook-form';
import ModalsContainer from 'src/Components/Modals/ModalsContainer/ModalsContainer';
import { ToastContainer } from 'react-toastify';
import { NotificationsService } from 'src/services';


// Enable the Mocks Service Worker
// -------------------------------------------

if (process.env.STORYBOOK_ENABLE_MOCKS) {
    worker.start({
        onUnhandledRequest: 'bypass',
    })
}

THEME.injectStyles()


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
            <ToastContainer
                {...NotificationsService.defaultOptions}
                newestOnTop={false}
                limit={2}
            />
        </>
    );
}

// This adds the stuff and setup that usually goes in the App.tsx
export const AppDecorator: DecoratorFn = (Component) => {
    useWrapperSetup();

    return <Component />
}

export const wrapModal: DecoratorFn = (Component) => <Modal isOpen id='some-id' onClose={() => { }}><Component /></Modal>

export const wrapPage: DecoratorFn = (Component) => <div className='page-container'><Component /></div>



export const ModalsDecorator: DecoratorFn = (Story) => {
    const onClose = () => { };
    return (
        <Modal isOpen id={'some-id'} onClose={onClose}  >
            <Story onClose={onClose} />
        </Modal>
    )
    // return (
    //     <motion.div
    //         className="w-screen fixed inset-0 overflow-x-hidden z-[2020]"
    //         initial={{ opacity: 0 }}
    //         animate={{ opacity: 1 }}
    //         exit={{
    //             opacity: 0,
    //             transition: { ease: "easeInOut" },
    //         }}
    //     >
    //         <AnimatePresence>
    //             <Modal onClose={onClose}  >
    //                 <Story onClose={onClose} />
    //             </Modal>
    //         </AnimatePresence>
    //     </motion.div>
    // );
}

export const centerDecorator: DecoratorFn = (Story) => {
    return <div className="min-h-screen flex justify-center items-center">
        <Story />
    </div>
}

export function WrapForm<T = any>(options?: Partial<UseFormProps<T> & { logValues: boolean }>): DecoratorFn {
    const Func: DecoratorFn = (Story) => {
        const methods = useForm<T>(options);

        if (options?.logValues) {
            console.log(methods.watch())
        }

        return <FormProvider {...methods} >
            <Story onChang />
        </FormProvider>
    }
    return Func
}

export function WrapFormController<T = any>(options: Partial<UseFormProps<T> & { logValues: boolean }> & { name: string }): DecoratorFn {
    const Func: DecoratorFn = (Story) => {

        const methods = useForm<T>(options);

        if (options?.logValues) {
            console.log(methods.watch(options.name as any))
        }

        return <Controller
            control={methods.control}
            name={options.name as any}
            render={({ field: { value, onChange, onBlur } }) =>
                <Story controller={{ value, onChange, onBlur }} />
            }
        />
    }
    return Func
}



export const WithModals: DecoratorFn = (Component) => <>
    <Component />
    <ModalsContainer />
</>
