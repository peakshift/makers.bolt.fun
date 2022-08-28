import { motion } from 'framer-motion';
import React, { ComponentProps, useRef } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { CgArrowsExchangeV } from 'react-icons/cg';
import { FiCamera } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { RotatingLines } from 'react-loader-spinner';
import { Nullable } from 'remirror';
import { useIsDraggingOnElement } from 'src/utils/hooks';
import SingleImageUploadInput from '../SingleImageUploadInput/SingleImageUploadInput'

type Value = ComponentProps<typeof SingleImageUploadInput>['value']

interface Props {
    width?: number;
    isRemovable?: boolean
    value: Value;
    onChange: (new_value: Nullable<Value>) => void
}

export default function AvatarInput(props: Props) {

    const dropAreaRef = useRef<HTMLDivElement>(null!)
    const isDragging = useIsDraggingOnElement({ ref: dropAreaRef });

    return (
        <div
            style={{
                width: props.width ?? 120,
            }}
            ref={dropAreaRef}
            className='aspect-square rounded-full outline outline-2 outline-gray-200 overflow-hidden cursor-pointer '
        >
            <SingleImageUploadInput
                value={props.value}
                onChange={props.onChange}
                wrapperClass='rounded-full bg-white h-full'
                render={({ img, isUploading, isDraggingOnWindow }) =>
                    <div className="w-full h-full rounded-full relative group">
                        {!img &&
                            <div className='w-full h-full rounded-full bg-white hover:bg-gray-100 flex flex-col justify-center items-center'>
                                <p className="text-center text-gray-400 text-body2 mb-8"><FiCamera /></p>
                                <div className={`text-gray-400 text-center text-body5`}>
                                    Add Image
                                </div>
                            </div>}
                        {img &&
                            <>
                                <img src={img.url} className='w-full h-full object-cover rounded-full' alt="" />
                                {!isUploading &&
                                    <div className="flex flex-wrap gap-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                                        <button type='button' className='py-8 px-12 rounded-full bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 hover:bg-opacity-90 transition-opacity text-white text-body1'>
                                            <CgArrowsExchangeV />
                                        </button>
                                        {props.isRemovable && <button type='button' className='py-8 px-12 rounded-full bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 hover:bg-opacity-90 transition-opacity text-white text-body1' onClick={(e) => { e.stopPropagation(); props.onChange(null) }}>
                                            <IoMdClose />
                                        </button>}
                                    </div>
                                }
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
                                    `absolute inset-0 ${isDragging ? 'bg-primary-600' : 'bg-primary-400'}  bg-opacity-80 flex flex-col justify-center items-center text-white font-bold transition-transform`
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
                                    className='text-center text-body4'
                                >
                                    <AiOutlineCloudUpload className="scale-150 text-body2" />
                                </motion.div>
                            </div>
                        }
                    </div>}
            />
        </div>

    )
}
