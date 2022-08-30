import { useToggle } from '@react-hookz/web';
import { createAction } from '@reduxjs/toolkit';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FiTrash2 } from 'react-icons/fi';
import Button from 'src/Components/Button/Button';
import IconButton from 'src/Components/IconButton/IconButton';
import { useReduxEffect } from 'src/utils/hooks/useReduxEffect';
import { WalletKeyType } from './LinkedAccountsCard'
import { useAppDispatch } from "src/utils/hooks";
import { openModal } from "src/redux/features/modals.slice";

interface Props {
    walletKey: WalletKeyType,
    onRename: (newName: string) => void
    onDelete: () => void
}



export default function WalletKey({ walletKey, onRename, onDelete }: Props) {

    const ref = useRef<HTMLInputElement>(null!);
    const [name, setName] = useState(walletKey.name);
    const [editMode, toggleEditMode] = useToggle(false);
    const dispatch = useAppDispatch();


    const CONFIRM_DELETE_WALLET = useMemo(() => createAction<{ confirmed?: boolean }>(`CONFIRM_DELETE_WALLET_${walletKey.key.slice(0, 10)}`)({}), [walletKey.key])

    const saveNameChanges = () => {
        toggleEditMode();
        onRename(name);
    }

    const onConfirmDelete = useCallback(({ payload: { confirmed } }: typeof CONFIRM_DELETE_WALLET) => {
        if (confirmed)
            onDelete()
    }, [onDelete])

    useReduxEffect(onConfirmDelete, CONFIRM_DELETE_WALLET.type);

    useEffect(() => {
        if (editMode)
            ref.current.focus()
    }, [editMode])

    const handleDelete = () => {
        dispatch(openModal({
            Modal: "RemoveWalletKeyModal",
            props: {
                callbackAction: {
                    type: CONFIRM_DELETE_WALLET.type,
                    payload: { confirmed: false }
                }
            }
        }))
    }

    return (
        <li key={walletKey.key} className="flex gap-16 items-center">
            <div className="input-wrapper relative min-w-0">
                <span className="input-icon !pr-0">🔑</span>
                <input
                    ref={ref}
                    disabled={!editMode}
                    type='text'
                    value={name}
                    className="input-text overflow-hidden text-ellipsis"
                    placeholder='e.g My Alby Key'
                    onChange={e => setName(e.target.value)}
                />
                {!editMode && <Button size='sm' color='none' className='text-blue-400 shrink-0' onClick={() => toggleEditMode()}>Rename</Button>}
                {editMode &&
                    <Button
                        size='sm'
                        color='none'
                        className='text-blue-400 shrink-0'
                        disabled={name.length === 0}
                        onClick={saveNameChanges}
                    >Save</Button>}
            </div>
            <div className="min-w-[60px] flex justify-center">
                {!walletKey.is_current ?
                    <IconButton
                        size='sm'
                        className='text-red-500 shrink-0 mx-auto'
                        onClick={() => handleDelete()}
                    ><FiTrash2 /> </IconButton>
                    :
                    <span className="text-body5 text-gray-400">(Current)</span>
                }
            </div>
        </li>
    )
}
