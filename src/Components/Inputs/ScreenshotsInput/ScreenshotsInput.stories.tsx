import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ScreenshotsInput from './ScreenshotsInput';
import { WrapForm } from 'src/utils/storybook/decorators';

export default {
    title: 'Shared/Inputs/Screenshots Input',
    component: ScreenshotsInput,
    decorators: [
        WrapForm<{ screenshots: Array<any[]> }>({
            logValues: true,
            defaultValues: {
                screenshots: []
            }
        })]
} as ComponentMeta<typeof ScreenshotsInput>;

const Template: ComponentStory<typeof ScreenshotsInput> = (args) => <ScreenshotsInput {...args} />


export const DefaultButton = Template.bind({});
DefaultButton.args = {
    name: 'screenshots',
}