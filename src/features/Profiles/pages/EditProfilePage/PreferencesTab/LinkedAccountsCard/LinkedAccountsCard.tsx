import Button from 'src/Components/Button/Button';
import { useAppDispatch } from 'src/utils/hooks';
import { openModal } from 'src/redux/features/modals.slice';
import Card from 'src/Components/Card/Card';
import { MyProfile } from 'src/graphql';
import Skeleton from 'react-loading-skeleton';
import { useReducer, useRef } from 'react';
import { Nullable } from 'remirror';


type Value = MyProfile['walletsKeys']

interface Props {
    value: Value,
    onChange: (newValue: Value) => void
}



// function reducer(state: State, action: Action): State {
//     switch (action.type) {
//         case 'set':
//             return {
//                 hasNewChanges: false,
//                 keys: [...action.payload],
//                 oldKeys: [...action.payload],
//             }
//         case 'delete':
//             if (state.keys.length === 1)
//                 return state;
//             return {
//                 hasNewChanges: true,
//                 oldKeys: state.oldKeys,
//                 keys: [...state.keys.slice(0, action.payload.idx), ...state.keys.slice(action.payload.idx + 1)]
//             };
//         case 'update':
//             return {
//                 hasNewChanges: true,
//                 oldKeys: state.oldKeys,
//                 keys: state.keys.map((item, idx) => {
//                     if (idx === action.payload.idx)
//                         return {
//                             ...item,
//                             name: action.payload.value
//                         }
//                     return item;
//                 }),

//             }
//         case 'cancel':
//             return {
//                 hasNewChanges: false,
//                 keys: [...state.oldKeys],
//                 oldKeys: state.oldKeys,
//             }
//     }
// }

export default function LinkedAccountsCard({ value, onChange }: Props) {

    const dispatch = useAppDispatch();
    const inputsRefs = useRef<Nullable<HTMLInputElement>[]>([]);
    // const [keysState, keysDispatch] = useReducer(reducer, { keys: [], oldKeys: [], hasNewChanges: false, });

    // const [updateKeys, updatingKeysStatus] = useUpdateUserWalletsKeysMutation({
    //     onCompleted: data => {
    //         keysDispatch({
    //             type: "set",
    //             payload: data.updateUserWalletKeys
    //         })
    //     }
    // })

    const connectNewWallet = () => {
        dispatch(openModal({ Modal: "LinkingAccountModal" }))
    }

    const updateKeyName = (idx: number, newName: string) => {
        onChange(value.map((item, i) => {
            if (i === idx)
                return {
                    ...item,
                    name: newName
                }
            return item;
        }))
    }

    const deleteKey = (idx: number,) => {
        onChange([...value.slice(0, idx), ...value.slice(idx + 1)])
    }


    return (
        <Card>
            <p className="text-body2 font-bold">🔐 Linked Accounts</p>
            <p className="text-body4 text-gray-600 mt-8">
                These are the wallets that you can login to this account from. You can add a new wallet below.
            </p>
            <div className='mt-24 flex flex-col gap-16'>
                <ul className="mt-8 relative flex flex-col gap-8">
                    {value.map((item, idx) =>
                        <li key={item.key} className="flex flex-wrap gap-16 justify-between items-center text-body4 border-b py-12 px-16 border border-gray-200 rounded-16 focus-within:ring-1 ring-primary-200">
                            <input
                                ref={el => inputsRefs.current[idx] = el}
                                type="text"
                                value={item.name}
                                onChange={e => {
                                    updateKeyName(idx, e.target.value)
                                }}
                                className='p-0 border-0 focus:border-0 focus:outline-none grow
                                                focus:ring-0 placeholder:!text-gray-400' />

                            <div className='flex gap-8 ml-auto'>
                                <Button size='sm' color='none' className='text-blue-400 !p-0' onClick={() => inputsRefs.current[idx]?.focus()}>Rename</Button>
                                {value.length > 1 && <Button size='sm' color='none' className='text-red-500 !p-0' onClick={() => deleteKey(idx)}>Delete key</Button>}
                            </div>
                        </li>
                    )}
                </ul>
                {/* <div className="flex justify-end gap-8">
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
                </div> */}
                {value.length < 3 &&
                    <Button color='white' className='mt-16' onClick={connectNewWallet}>
                        Connect new wallet ⚡
                    </Button>}

            </div>
        </Card>
    )
}
