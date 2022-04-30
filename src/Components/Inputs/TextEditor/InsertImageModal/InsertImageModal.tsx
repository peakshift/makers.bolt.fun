import React, { FormEvent, useState } from 'react'
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer'
import { motion } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
import Button from 'src/Components/Button/Button'

interface Props extends ModalCard {
    onInsert: (img: { src: string, alt?: string }) => void
}

export default function InsertImageModal({ onClose, direction, onInsert, ...props }: Props) {

    const [urlInput, setUrlInput] = useState("")
    const [altInput, setAltInput] = useState("")

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (urlInput.length > 10) {
            onInsert({ src: urlInput, alt: altInput })
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
            <h2 className='text-h5 font-bold'>Add Image</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-3 gap-16 mt-32">
                    <div className='md:col-span-2'>
                        <p className="text-body5">
                            Image URL
                        </p>
                        <div className="input-wrapper mt-8 relative">
                            <input
                                type='text'
                                className="input-text"
                                value={urlInput}
                                onChange={e => setUrlInput(e.target.value)}
                                placeholder='https://images.com/my-image'
                            />
                        </div>
                    </div>
                    <div>
                        <p className="text-body5">
                            Alt Text
                        </p>
                        <div className="input-wrapper mt-8 relative">
                            <input
                                type='text'
                                className="input-text"
                                value={altInput}
                                onChange={e => setAltInput(e.target.value)}
                                placeholder=''
                            />
                        </div>
                    </div>
                </div>
                <div className="flex gap-16 justify-end mt-32">
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type='submit' color='primary' >
                        Add
                    </Button>
                </div>
            </form>

        </motion.div>
    )
}
