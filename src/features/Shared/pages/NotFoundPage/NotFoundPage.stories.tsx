import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ModifyArgs } from 'src/utils/storybook/utils';
import NotFoundPage from './NotFoundPage';

export default {
    title: 'Shared/Pages/Not Found Page',
    component: NotFoundPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    }
} as ComponentMeta<typeof NotFoundPage>;


const Template: ComponentStory<typeof NotFoundPage> = (args) => <NotFoundPage {...args as any} ></NotFoundPage>

export const Page = Template.bind({});
Page.args = {
}


