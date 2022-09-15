import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ThumbnailInput from './ThumbnailInput';
import { WrapFormController } from 'src/utils/storybook/decorators';
import { ImageType } from '../SingleImageUploadInput/SingleImageUploadInput';

export default {
    title: 'Shared/Inputs/Files Inputs/Thumbnail ',
    component: ThumbnailInput,
    decorators: [
        WrapFormController<{ thumbnail: ImageType | null }>({
            logValues: true,
            name: "thumbnail",
            defaultValues: {
                thumbnail: null
            }
        })]
} as ComponentMeta<typeof ThumbnailInput>;

const Template: ComponentStory<typeof ThumbnailInput> = (args, context) => {

    return <ThumbnailInput {...context.controller} {...args} />

}


export const Default = Template.bind({});
Default.args = {
} 