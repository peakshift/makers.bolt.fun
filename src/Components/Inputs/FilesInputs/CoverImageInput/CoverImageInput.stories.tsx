import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { WrapFormController } from 'src/utils/storybook/decorators';
import { ImageType } from '../SingleImageUploadInput/SingleImageUploadInput';
import CoverImageInput from './CoverImageInput';

export default {
    title: 'Shared/Inputs/Files Inputs/Cover Image ',
    component: CoverImageInput,
    decorators: [
        WrapFormController<{ thumbnail: ImageType | null }>({
            logValues: true,
            name: "thumbnail",
            defaultValues: {
                thumbnail: null
            }
        })]
} as ComponentMeta<typeof CoverImageInput>;

const Template: ComponentStory<typeof CoverImageInput> = (args, context) => {

    return <div className="aspect-[5/2] md:aspect-[4/1] rounded-t-16 overflow-hidden">
        <CoverImageInput {...context.controller} {...args} />
    </div>

}


export const Default = Template.bind({});
Default.args = {
} 