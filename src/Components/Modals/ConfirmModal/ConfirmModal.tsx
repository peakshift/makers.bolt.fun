import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer'
import { motion } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
import Button from 'src/Components/Button/Button'
import { useAppDispatch } from 'src/utils/hooks'
import { PayloadAction } from '@reduxjs/toolkit'
import { UnionToObjectKeys } from 'src/utils/types/utils'

interface Props extends ModalCard {
    title?: string,
    message?: string,
    actionName?: string,
    color?: 'red' | 'yellow' | 'blue'
    callbackAction: PayloadAction<{ confirmed?: boolean, id?: string | number }>
}


const textColor: UnionToObjectKeys<Props, 'color'> = {
    red: "text-red-500",
    blue: "text-blue-500",
    yellow: "text-yellow-500",
}

const fillColor: UnionToObjectKeys<Props, 'color'> = {
    red: "bg-red-500 text-white",
    blue: "bg-blue-500 text-white",
    yellow: "bg-yellow-500 text-white",
}


export default function ConfirmModal({
    onClose, direction, callbackAction,
    title = 'Confirm Action',
    actionName = 'Confirm',
    message = 'Are you sure you want to do this ??',
    color = 'red',
    ...props }: Props) {

    const dispatch = useAppDispatch();

    const handleConfirm = () => {

        const action = Object.assign({}, callbackAction);
        action.payload = { confirmed: true, id: callbackAction.payload.id }
        dispatch(action)
        onClose?.();
    }

    return (
        <motion.div
            custom={direction}
            variants={modalCardVariants}
            initial='initial'
            animate="animate"
            exit='exit'
            className="modal-card max-w-[660px] p-24 rounded-xl relative"
        >
            <IoClose className='absolute text-body2 top-24 right-24 hover:cursor-pointer' onClick={onClose} />
            <h2 className={`text-h3 font-bold ${textColor[color]}`}>{title}</h2>
            <p className="text-body4 text-gray-600 mt-24">
                {message}
            </p>
            <div className="flex justify-end gap-16 mt-16">
                <Button color='gray' onClick={onClose} >Cancel</Button>
                <Button color='none' className={`${fillColor[color]}`} onClick={handleConfirm} >{actionName}</Button>
            </div>


        </motion.div>
    )
}
