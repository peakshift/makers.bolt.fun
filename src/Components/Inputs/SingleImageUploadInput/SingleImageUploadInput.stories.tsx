import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SingleImageUploadInput, { ImageType } from './SingleImageUploadInput';
import { WrapFormController } from 'src/utils/storybook/decorators';
import { RotatingLines } from 'react-loader-spinner';
import { FiCamera, } from 'react-icons/fi';
import { FaExchangeAlt, FaImage } from 'react-icons/fa';

export default {
    title: 'Shared/Inputs/Files Inputs/Single Image Upload ',
    component: SingleImageUploadInput,
    decorators: [
        WrapFormController<{ avatar: ImageType | null }>({
            logValues: true,
            name: "avatar",
            defaultValues: {
                avatar: null
            }
        })]
} as ComponentMeta<typeof SingleImageUploadInput>;

const Template: ComponentStory<typeof SingleImageUploadInput> = (args, context) => {

    return <SingleImageUploadInput {...context.controller} {...args} />

}


export const Avatar = Template.bind({});
Avatar.args = {
    wrapperClass: "inline-block cursor-pointer ",
    render: ({ img, isUploading }) => <div className="w-[120px] hover:bg-gray-100  aspect-square rounded-full border-2 border-gray200 overflow-hidden relative flex flex-col justify-center items-center">
        {img && <img src={img.url} className='w-full h-full object-cover rounded-full' alt="" />}
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
    </div>
}

export const Thumbnail = Template.bind({});
Thumbnail.args = {
    wrapperClass: "inline-block cursor-pointer ",
    render: ({ img, isUploading }) => <div className="w-[120px] aspect-square rounded-16 border-2 border-gray200 overflow-hidden relative flex flex-col justify-center items-center">
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
    </div>
}

export const Cover = Template.bind({});
Cover.args = {
    wrapperClass: "block cursor-pointer ",
    render: ({ img, isUploading }) => <div className="w-full group aspect-[5/2] md:aspect-[4/1] bg-gray-700 rounded-16 border-2 border-gray200 overflow-hidden relative flex flex-col justify-center items-center">
        {img && <>
            <img src={img.url} className='w-full h-full object-cover rounded-16' alt="" />
            {!isUploading &&
                <button className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-16 px-24 rounded-12 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 hover:bg-opacity-90 transition-opacity text-white text-h1'>
                    <FaExchangeAlt />
                </button>}
        </>}
        {!img &&
            <>
                <p className="text-center text-gray-100 text-body1 md:text-h1 mb-8"><FaImage /></p>
                <div className={`text-gray-100 text-center text-body4`}>
                    Drop a <span className="font-bold">COVER IMAGE</span> here or  <br />  <span className="text-blue-300 underline">Click to browse</span>
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
    </div>
}

