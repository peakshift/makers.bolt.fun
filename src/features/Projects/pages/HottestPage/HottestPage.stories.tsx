import { ComponentStory, ComponentMeta } from '@storybook/react';
import HottestPage from './HottestPage';

export default {
    title: 'Projects/Hottest Page',
    component: HottestPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof HottestPage>;


const Template: ComponentStory<typeof HottestPage> = (args) => <HottestPage {...args as any} ></HottestPage>

export const Page = Template.bind({});
Page.args = {
}


