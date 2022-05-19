import { ComponentStory, ComponentMeta } from '@storybook/react';

import SortBy from './SortByFilter';

export default {
    title: 'Hackathons/Components/Filters/Sort By',
    component: SortBy,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof SortBy>;


const Template: ComponentStory<typeof SortBy> = (args) => <div className="max-w-[326px]"><SortBy {...args as any} ></SortBy></div>

export const Default = Template.bind({});
Default.args = {
}


