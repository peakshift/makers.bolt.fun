import React, { FormEvent, useState } from 'react'
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer'
import { motion } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
import Button from 'src/Components/Button/Button'
import { useAppDispatch } from 'src/utils/hooks'
import { PayloadAction } from '@reduxjs/toolkit'

interface Props extends ModalCard {
    callbackAction: PayloadAction<{ src: string, alt?: string }>
}


export default function InsertVideoModal({ onClose, direction, callbackAction, ...props }: Props) {

    const [urlInput, setUrlInput] = useState("")
    const dispatch = useAppDispatch();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const id = extractId(urlInput);
        if (id) {
            const action = Object.assign({}, callbackAction);
            action.payload = { src: id }
            dispatch(action)
            onClose?.();
        }
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
            <h2 className='text-h5 font-bold'>Insert Youtube Video</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-16 mt-32">
                    <div className='md:col-span-2'>
                        <p className="text-body5">
                            Video URL
                        </p>
                        <div className="input-wrapper mt-8 relative">
                            <input
                                type='text'
                                className="input-text"
                                value={urlInput}
                                onChange={e => setUrlInput(e.target.value)}
                                placeholder='https://www.youtube.com/watch?v=****'
                            />
                        </div>
                    </div>
                </div>
                <div className="flex gap-16 justify-end mt-32">
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type='submit' color='primary' >
                        Insert
                    </Button>
                </div>
            </form>

        </motion.div>
    )
}


function extractId(url: string) {
    const rgx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    return url.match(rgx)?.[1]
}