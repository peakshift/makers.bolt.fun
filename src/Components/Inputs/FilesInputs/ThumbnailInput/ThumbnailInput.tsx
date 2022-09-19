import React, { ComponentProps } from 'react'
import { FiCamera } from 'react-icons/fi';
import { RotatingLines } from 'react-loader-spinner';
import { Nullable } from 'remirror';
import SingleImageUploadInput from '../SingleImageUploadInput/SingleImageUploadInput'

type Value = ComponentProps<typeof SingleImageUploadInput>['value']

interface Props {
    width?: number
    value: Value;
    onChange: (new_value: Nullable<Value>) => void
}

export default function ThumbnailInput(props: Props) {
    return (
        <div
            style={{
                width: props.width ?? 120,
            }}
            className='aspect-square rounded-16 outline outline-2 outline-gray-200 overflow-hidden cursor-pointer bg-white hover:bg-gray-100'
        >
            <SingleImageUploadInput
                value={props.value}
                onChange={props.onChange}
                wrapperClass='h-full'
                render={({ img, isUploading }) => <div className="w-full h-full relative flex flex-col justify-center items-center">
                    {img && <img src={img.url} className='w-full h-full object-cover rounded-16' alt="" />}
                    {!img &&
                        <>
                            <p className="text-center text-gray-400 text-body2 mb-8"><FiCamera /></p>
                            <div className={`text-gray-400 text-center text-body5`}>
                                Add Image
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
                </div>}
            />
        </div>

    )
}
