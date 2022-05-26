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
            BOLT.FUN is a place by the community for the community of Lapps makers, developers, passionates, & anyone else interested.
        </p>
    },
    {
        heading: "What can you do here ??",
        content: <p className='text-body4 text-gray-600'>
            - Publish & view the various Lapps out there
            <br />
            - Read stories
            <br />
            - Ask/Answer questions
            <br />
            - Offer/Complete bounties
            <br />
            - View/Add hackathons
            <br />
        </p>
    },
    {
        heading: "Who is working on BOLT.FUN ??",
        content: <p className='text-body4 text-gray-600'>
            - Johns (Manager)
            <br />
            - Ed (Product Designer)
            <br />
            - Alexandare (Designer)
            <br />
            - MTG (Developer)
            <br />
        </p>
    },
]


const Template: ComponentStory<typeof Accordion> = (args) => <div className="bg-white px-24 rounded-16"><Accordion {...args as any} >Accordion</Accordion></div>

export const Default = Template.bind({});
Default.args = {
    items
}
