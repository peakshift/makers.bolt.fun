import { ComponentStory, ComponentMeta } from '@storybook/react';

import PopularCategories from './PopularCategories';

export default {
    title: 'Posts/FeedPage/Components/PopularCategories',
    component: PopularCategories,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof PopularCategories>;


const Template: ComponentStory<typeof PopularCategories> = (args) => <div className="max-w-[326px]"><PopularCategories {...args as any} ></PopularCategories></div>

export const Default = Template.bind({});
Default.args = {
}


