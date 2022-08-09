import Button from 'src/Components/Button/Button';
import { useAppDispatch } from 'src/utils/hooks';
import { openModal } from 'src/redux/features/modals.slice';
import { useMyWalletsKeysQuery, useUpdateUserWalletsKeysMutation } from 'src/graphql';
import Skeleton from 'react-loading-skeleton';
import { useReducer } from 'react';


interface Props {

}


type State = {
    hasNewChanges: boolean,
    keys: Array<{ key: string, name: string }>,
    oldKeys: Array<{ key: string, name: string }>
}


type Action =
    | {
        type: 'set'
        payload: State['keys']
    }
    | {
        type: 'delete',
        payload: { idx: number }
    }
    | {
        type: 'update',
        payload: {
            idx: number,
            value: string,
        }
    }
    | {
        type: 'cancel'
    }

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'set':
            return {
                hasNewChanges: false,
                keys: [...action.payload],
                oldKeys: [...action.payload],
            }
        case 'delete':
            if (state.keys.length === 1)
                return state;
            return {
                hasNewChanges: true,
                oldKeys: state.oldKeys,
                keys: [...state.keys.slice(0, action.payload.idx), ...state.keys.slice(action.payload.idx + 1)]
            };
        case 'update':
            return {
                hasNewChanges: true,
                oldKeys: state.oldKeys,
                keys: state.keys.map((item, idx) => {
                    if (idx === action.payload.idx)
                        return {
                            ...item,
                            name: action.payload.value
                        }
                    return item;
                }),

            }
        case 'cancel':
            return {
                hasNewChanges: false,
                keys: [...state.oldKeys],
                oldKeys: state.oldKeys,
            }
    }
}

export default function AccountCard({ }: Props) {

    const dispatch = useAppDispatch();
    const [keysState, keysDispatch] = useReducer(reducer, { keys: [], oldKeys: [], hasNewChanges: false, });
    const myKeysQuery = useMyWalletsKeysQuery({
        onCompleted: data => {
            keysDispatch({
                type: 'set',
                payload: data.myWalletsKeys
            })
        }
    });
    const [updateKeys, updatingKeysStatus] = useUpdateUserWalletsKeysMutation({
        onCompleted: data => {
            keysDispatch({
                type: "set",
                payload: data.updateUserWalletKeys
            })
        }
    })

    const connectNewWallet = () => {
        dispatch(openModal({ Modal: "LinkingAccountModal" }))
    }

    const saveChanges = () => {
        updateKeys({
            variables: {
                data: keysState.keys.map(v => ({ key: v.key, name: v.name }))
            }
        })
    }

    const cancelChanges = () => {
        keysDispatch({ type: 'cancel' });
    }


    return (
        <div className="rounded-16 bg-white border-2 border-gray-200 p-24">
            <p className="text-body2 font-bold">Account Settings</p>


            <div className='mt-24 flex flex-col gap-16'>
                <p className="text-body3 font-bold">Linked Wallets</p>
                <p className="text-body4 text-gray-600">
                    These are the wallets that you can login to this account from.
                    <br />
                    You can add a new wallet from the button below.
                </p>
                {
                    myKeysQuery.loading ?
                        <ul className="mt-8 relative flex flex-col gap-8">
                            {Array(2).fill(0).map((_, idx) =>
                                <li key={idx} className="text-body4 border-b py-12 px-16 border border-gray-200 rounded-16">
                                    <Skeleton width='15ch' />
                                </li>
                            )}
                        </ul>
                        :
                        <>
                            <ul className="mt-8 relative flex flex-col gap-8">
                                {keysState.keys.map((item, idx) =>
                                    <li key={item.key} className="flex justify-between items-center text-body4 border-b py-12 px-16 border border-gray-200 rounded-16">
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={e => {
                                                keysDispatch({
                                                    type: 'update',
                                                    payload: {
                                                        idx,
                                                        value: e.target.value
                                                    }
                                                })
                                            }}
                                            className='p-0 border-0 focus:border-0 focus:outline-none grow
                                                focus:ring-0 placeholder:!text-gray-400' />

                                        <Button size='sm' color='none' className='text-red-500 !p-0' onClick={() => keysDispatch({ type: 'delete', payload: { idx } })}>Delete key</Button>

                                    </li>
                                )}
                            </ul>
                            <div className="flex justify-end gap-8">
                                <Button
                                    color='gray'
                                    className=''
                                    disabled={!keysState.hasNewChanges || updatingKeysStatus.loading}
                                    onClick={cancelChanges}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color='black'
                                    className=''
                                    disabled={!keysState.hasNewChanges}
                                    isLoading={updatingKeysStatus.loading}
                                    onClick={saveChanges}
                                >
                                    Save Changes
                                </Button>
                            </div>
                            {keysState.keys.length < 3 && <Button color='primary' className='mt-16' onClick={connectNewWallet}>
                                Connect new wallet ⚡
                            </Button>}
                        </>
                }
            </div>


        </div>
    )
}
