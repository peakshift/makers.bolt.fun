import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ScreenshotsInput, { ScreenshotType } from './ScreenshotsInput';
import { WrapForm, WrapFormController } from 'src/utils/storybook/decorators';

export default {
    title: 'Shared/Inputs/Files Inputs/Screenshots',
    component: ScreenshotsInput,
    decorators: [
        WrapFormController<{ screenshots: Array<ScreenshotType> }>({
            logValues: true,
            name: "screenshots",
            defaultValues: {
                screenshots: []
            }
        })]
} as ComponentMeta<typeof ScreenshotsInput>;

const Template: ComponentStory<typeof ScreenshotsInput> = (args, context) => {

    return <ScreenshotsInput {...context.controller} {...args} />

}


export const Empty = Template.bind({});
Empty.args = {
}

export const WithValues = Template.bind({});
WithValues.decorators = [
    WrapFormController<{ screenshots: Array<ScreenshotType> }>({
        logValues: true,
        name: "screenshots",
        defaultValues: {
            screenshots: [{
                id: '123',
                name: 'tree',
                url: "https://picsum.photos/id/1021/800/800.jpg"
            },
            {
                id: '555',
                name: 'whatever',
                url: "https://picsum.photos/id/600/800/800.jpg"
            },]
        }
    }) as any
];
WithValues.args = {
}

export const Full = Template.bind({});
Full.decorators = [
    WrapFormController<{ screenshots: Array<ScreenshotType> }>({
        logValues: true,
        name: "screenshots",
        defaultValues: {
            screenshots: [
                {
                    id: '123',
                    name: 'tree',
                    url: "https://picsum.photos/id/1021/800/800.jpg"
                },
                {
                    id: '555',
                    name: 'whatever',
                    url: "https://picsum.photos/id/600/800/800.jpg"
                },
                {
                    id: '562',
                    name: 'Moon',
                    url: "https://picsum.photos/id/32/800/800.jpg"
                },
                {
                    id: '342',
                    name: 'Sun',
                    url: "https://picsum.photos/id/523/800/800.jpg"
                },
            ]
        }
    }) as any
];
Full.args = {
}