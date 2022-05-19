import { ComponentStory, ComponentMeta } from '@storybook/react';

import TopicsFilter from './TopicsFilter';

export default {
    title: 'Hackathons/Components/Filters/Topics',
    component: TopicsFilter,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof TopicsFilter>;


const Template: ComponentStory<typeof TopicsFilter> = (args) => <div className="max-w-[326px]"><TopicsFilter {...args as any} ></TopicsFilter></div>

export const Default = Template.bind({});
Default.args = {
}


