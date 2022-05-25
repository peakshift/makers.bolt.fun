import { ComponentStory, ComponentMeta } from '@storybook/react';

import Accordion from './Accordion';

export default {
    title: 'Shared/Accordion',
    component: Accordion,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Accordion>;

const items = [
    {
        heading: "What is BOLT.FUN ??",
        content: <p className='text-body4 text-gray-600'>
            Exercitation in fugiat est ut ad ea cupidatat ut in
            cupidatat occaecat ut occaecat consequat est minim minim
            esse tempor laborum consequat esse adipisicing eu
            reprehenderit enim.
        </p>
    },
    {
        heading: "What Do we do ??",
        content: <p className='text-body4 text-gray-600'>
            Exercitation in fugiat est ut ad ea cupidatat ut in
            cupidatat occaecat ut occaecat consequat est minim minim
            esse tempor laborum consequat esse adipisicing eu
            reprehenderit enim.
        </p>
    },
    {
        heading: "Who is working on BOLT.FUN ??",
        content: <p className='text-body4 text-gray-600'>
            Exercitation in fugiat est ut ad ea cupidatat ut in
            cupidatat occaecat ut occaecat consequat est minim minim
            esse tempor laborum consequat esse adipisicing eu
            reprehenderit enim.
        </p>
    },
]


const Template: ComponentStory<typeof Accordion> = (args) => <div className="bg-white px-24 rounded-16"><Accordion {...args as any} >Accordion</Accordion></div>

export const Default = Template.bind({});
Default.args = {
    items
}
