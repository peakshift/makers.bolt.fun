import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AvatarInput from './AvatarInput';
import { WrapFormController } from 'src/utils/storybook/decorators';
import { ImageType } from '../SingleImageUploadInput/SingleImageUploadInput';

export default {
    title: 'Shared/Inputs/Files Inputs/Avatar ',
    component: AvatarInput,
    decorators: [
        WrapFormController<{ avatar: ImageType | null }>({
            logValues: true,
            name: "avatar",
            defaultValues: {
                avatar: null
            }
        })]
} as ComponentMeta<typeof AvatarInput>;

const Template: ComponentStory<typeof AvatarInput> = (args, context) => {

    return <AvatarInput {...context.controller} {...args} />

}


export const Default = Template.bind({});
Default.args = {
} 