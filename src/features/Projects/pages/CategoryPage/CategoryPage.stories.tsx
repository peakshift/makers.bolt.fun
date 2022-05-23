import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ModifyArgs } from 'src/utils/storybook/utils';
import CategoryPage from './CategoryPage';

export default {
    title: 'Projects/Category Page',
    component: CategoryPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    parameters: {
        modifyArgs: {
            router: {
                routePath: "/:id",
                currentPath: "/1"
            }
        } as ModifyArgs
    }
} as ComponentMeta<typeof CategoryPage>;


const Template: ComponentStory<typeof CategoryPage> = (args) => <CategoryPage {...args as any} ></CategoryPage>

export const Page = Template.bind({});
Page.args = {
}


