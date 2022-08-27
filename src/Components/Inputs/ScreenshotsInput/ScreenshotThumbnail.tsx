import React from 'react'
import { FaTimes } from 'react-icons/fa';
import { RotatingLines } from 'react-loader-spinner';

interface Props {
    url?: string,
    isLoading?: boolean;
    isError?: boolean;
    onCancel?: () => void;

}

export default function ScreenshotThumbnail({ url, isLoading, isError, onCancel }: Props) {

    const isEmpty = !url;

    return (
        <div className={`
        aspect-video relative rounded-16 md:rounded-14 overflow-hidden border-2 border-gray-200
        ${isEmpty && "border-dashed"}
        `}>
            {!isEmpty && <img src={url}
                className={`
            w-full h-full object-cover
            ${isLoading && 'opacity-50'} 
            `}
                alt="" />}
            <div className="text-body5 absolute inset-0"
            >
            </div>
            {isLoading &&
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
                </div>}
            {isError &&
                <div className="absolute inset-0 bg-red-400  bg-opacity-60 flex flex-col justify-center items-center text-white font-bold">
                    Failed...
                </div>}
            {!isEmpty &&
                <button className="absolute bg-gray-900 hover:bg-opacity-100 bg-opacity-60 text-white rounded-full w-32 h-32 top-8 right-8" onClick={() => onCancel?.()}><FaTimes /></button>
            }
        </div>
    )
}
