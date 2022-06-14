import { ComponentStory, ComponentMeta } from '@storybook/react';

import PopularTags from './PopularTagsFilter';

export default {
    title: 'Posts/Feed Page/Components/Popular Topics Filter',
    component: PopularTags,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof PopularTags>;


const Template: ComponentStory<typeof PopularTags> = (args) => <div className="max-w-[326px]"><PopularTags {...args as any} ></PopularTags></div>

export const Default = Template.bind({});
Default.args = {
}


