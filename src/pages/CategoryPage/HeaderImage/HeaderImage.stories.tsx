import { ComponentStory, ComponentMeta } from '@storybook/react';

import HeaderImage from './HeaderImage';

export default {
    title: 'Pages/Category/Header Image',
    component: HeaderImage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof HeaderImage>;


const Template: ComponentStory<typeof HeaderImage> = (args) => <HeaderImage {...args} ></HeaderImage>

export const Default = Template.bind({});
Default.args = {
    title: 'Art & Collectibles',
    apps_count: 44,
    img: '/assets/images/header-2.jfif'
}


