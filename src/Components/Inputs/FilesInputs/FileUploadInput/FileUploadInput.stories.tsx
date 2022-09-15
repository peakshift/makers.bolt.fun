import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';
import FileUploadInput from './FileUploadInput';

export default {
    title: 'Shared/Inputs/Files Inputs/Basic',
    component: FileUploadInput,

} as ComponentMeta<typeof FileUploadInput>;

const Template: ComponentStory<typeof FileUploadInput> = (args) => <FileUploadInput {...args} />


export const DefaultButton = Template.bind({});
DefaultButton.args = {
}