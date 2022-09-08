import { motion } from 'framer-motion'
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer'
import { IoClose } from 'react-icons/io5';
import Avatar from 'src/features/Profiles/Components/Avatar/Avatar';
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import Button from 'src/Components/Button/Button';
import { Direction, replaceModal } from 'src/redux/features/modals.slice';


interface Props extends ModalCard {
    tournamentId: number
}

export default function ConfirmAccount({ onClose, direction, tournamentId, ...props }: Props) {

    const me = useAppSelector(state => state.user.me)
    const dispatch = useAppDispatch();

    if (!me)
        return null;

    const onCancel = () => onClose?.();
    const onContinue = () => {
        dispatch(replaceModal({
            Modal: "RegisterTournamet_RegistrationDetails",
            direction: Direction.NEXT,
            props: {
                tournamentId
            }
        }))
    }


    return (
        <motion.div
            custom={direction}
            variants={modalCardVariants}
            initial='initial'
            animate="animate"
            exit='exit'
            className="modal-card max-w-[442px] rounded-xl relative"
        >
            <div className="p-24">
                <IoClose className='absolute text-body2 top-24 right-24 hover:cursor-pointer' onClick={onClose} />
                <h2 className='text-h5 font-bold text-center'>Register for tournament</h2>
            </div>
            <hr className="bg-gray-200" />
            <div className='flex flex-col justify-center gap-16 items-center text-center p-24'>
                <Avatar src={me.avatar} width={80} />
                <div className="flex flex-col gap-4">
                    <p className="text-body3 text-gray-900">{me.name}</p>
                    <p className="text-body4 text-gray-600">{me.jobTitle}</p>
                </div>


                <p className="text-body4 text-gray-600">You are currently signed in using this profile. Would you like to continue with your ⚔️ Tournament registration?</p>

                <div className="grid grid-cols-2 gap-16 w-full">
                    <Button color='gray' onClick={onCancel}>Cancel</Button>
                    <Button color='primary' onClick={onContinue}>Continue</Button>
                </div>
            </div>
        </motion.div>
    )
}



