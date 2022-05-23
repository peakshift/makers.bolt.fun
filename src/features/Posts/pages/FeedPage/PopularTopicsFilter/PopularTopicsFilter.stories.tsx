import { ComponentStory, ComponentMeta } from '@storybook/react';

import PopularTopicsFilter from './PopularTopicsFilter';

export default {
    title: 'Posts/Feed Page/Components/Popular Topics Filter',
    component: PopularTopicsFilter,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof PopularTopicsFilter>;


const Template: ComponentStory<typeof PopularTopicsFilter> = (args) => <div className="max-w-[326px]"><PopularTopicsFilter {...args as any} ></PopularTopicsFilter></div>

export const Default = Template.bind({});
Default.args = {
}


