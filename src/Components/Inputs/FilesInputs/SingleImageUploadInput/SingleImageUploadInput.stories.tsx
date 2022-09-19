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


