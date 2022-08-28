import React, { FormEvent, useRef, useState } from 'react'
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer'
import { motion } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
import Button from 'src/Components/Button/Button'
import { useAppDispatch, useIsDraggingOnElement } from 'src/utils/hooks'
import { PayloadAction } from '@reduxjs/toolkit'
import { RotatingLines } from 'react-loader-spinner'
import { FaExchangeAlt, FaImage } from 'react-icons/fa'
import SingleImageUploadInput, { ImageType } from 'src/Components/Inputs/FilesInputs/SingleImageUploadInput/SingleImageUploadInput'
import { AiOutlineCloudUpload } from 'react-icons/ai'

interface Props extends ModalCard {
    callbackAction: PayloadAction<{ src: string, alt?: string }>
}

export default function InsertImageModal({ onClose, direction, callbackAction, ...props }: Props) {

    const [uploadedImage, setUploadedImage] = useState<ImageType | null>(null)
    const [altInput, setAltInput] = useState("")
    const dispatch = useAppDispatch();

    const dropAreaRef = useRef<HTMLDivElement>(null!)
    const isDragging = useIsDraggingOnElement({ ref: dropAreaRef });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log(uploadedImage?.url);

        if (uploadedImage?.url) {
            // onInsert({ src: urlInput, alt: altInput })
            const action = Object.assign({}, callbackAction);
            action.payload = { src: uploadedImage.url, alt: altInput }
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
            <h2 className='text-h5 font-bold'>Add Image</h2>
            <form onSubmit={handleSubmit}>
                {/* <div className="grid md:grid-cols-3 gap-16 mt-32">
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
                <div className="mt-32 w-1/2 mx-auto aspect-video bg-gray-200 rounded-10">
                    {urlInput && <img
                        src={urlInput}
                        className='w-full h-full object-cover rounded-10'
                        alt={altInput}
                    />}
                </div> */}
                <SingleImageUploadInput
                    value={uploadedImage}
                    onChange={setUploadedImage}
                    wrapperClass='h-full mt-32'
                    render={({ img, isUploading, isDraggingOnWindow }) => <div ref={dropAreaRef} className="w-full group aspect-video bg-gray-100 cursor-pointer rounded-16 border-2 border-gray200 overflow-hidden relative flex flex-col justify-center items-center">
                        {img && <>
                            <img src={img.url} className='w-full h-full object-cover rounded-16' alt="" />
                            {!isUploading &&
                                <button type='button' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-16 px-24 rounded-12 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 hover:bg-opacity-90 transition-opacity text-white text-h3'>
                                    <FaExchangeAlt />
                                </button>}
                        </>}
                        {!img &&
                            <>
                                <p className="text-center text-gray-700 text-body1 md:text-h1 mb-8"><FaImage /></p>
                                <div className={`text-gray-600 text-center text-body4`}>
                                    Drop an <span className="font-bold">IMAGE</span> here or  <br />  <span className="text-blue-500 underline">Click to browse</span>
                                </div>
                            </>}
                        {isUploading &&
                            <div
                                className="absolute inset-0 bg-gray-400  bg-opacity-60 flex flex-col justify-center items-center text-white font-bold transition-transform"
                            >
                                <RotatingLines
                                    strokeColor="#fff"
                                    strokeWidth="3"
                                    animationDuration="0.75"
                                    width="48"
                                    visible={true}
                                />
                            </div>
                        }
                        {isDraggingOnWindow &&
                            <div
                                className={
                                    `absolute inset-0 ${isDragging ? 'bg-primary-600' : 'bg-primary-400'} bg-opacity-80 flex flex-col justify-center items-center text-white font-bold transition-transform`
                                }
                            >

                                <motion.div
                                    initial={{ y: 0 }}
                                    animate={
                                        isDragging ? {
                                            y: 5,
                                            transition: {
                                                duration: .4,
                                                repeat: Infinity,
                                                repeatType: 'mirror',
                                            }
                                        } : {
                                            y: 0
                                        }}
                                    className='text-center text-body1'
                                >
                                    <AiOutlineCloudUpload className="scale-150 text-h1 mb-16" />
                                    <br />
                                    Drop here to upload
                                </motion.div>
                            </div>
                        }
                    </div>}
                />
                <div className='mt-24'>
                    <p className="text-body5">
                        Alternative Text
                    </p>
                    <div className="input-wrapper mt-8 relative">
                        <input
                            type='text'
                            className="input-text"
                            value={altInput}
                            onChange={e => setAltInput(e.target.value)}
                            placeholder='A description for the content of this image'
                        />
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
