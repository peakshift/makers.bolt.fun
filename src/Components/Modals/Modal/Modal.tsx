import { ReactElement } from "react";
import ReactModal from 'react-modal';
import { removeClosedModal } from "src/redux/features/modals.slice";
import { useAppDispatch } from 'src/utils/hooks'


interface Props {
    id: string,
    isOpen: boolean;
    isPageModal?: boolean;
    children: ReactElement
    onClose: () => void;
    [key: string]: any;
}

ReactModal.setAppElement('#root');

export default function Modal({ onClose, children, ...props }: Props) {

    const dispatch = useAppDispatch();

    const onAfterClose = () => {
        dispatch(removeClosedModal(props.id))
    }

    return <ReactModal
        isOpen={props.isOpen}
        onRequestClose={onClose}
        overlayClassName='fixed w-full inset-0 overflow-x-hidden z-[2020] no-scrollbar'
        className=' '
        closeTimeoutMS={1000}
        onAfterClose={onAfterClose}
        contentElement={(_props, children) => <div {..._props} className={`${_props.className} w-screen min-h-screen relative flex flex-col justify-center items-center md:py-64 md:px-16 inset-0`}>
            <div
                onClick={onClose}
                className={`absolute w-full h-full top-0 left-0 bg-gray-300 bg-opacity-50 ${props.isPageModal && "hidden md:block"}`}
            ></div>
            {children}
        </div>}
    >
        {children}
    </ReactModal>
}

