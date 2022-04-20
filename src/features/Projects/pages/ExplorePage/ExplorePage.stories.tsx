import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ModifyArgs } from 'src/utils/storybook/utils';
import ExplorePage from './ExplorePage';

export default {
    title: 'Projects/Explore Page',
    component: ExplorePage,
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
} as ComponentMeta<typeof ExplorePage>;


const Template: ComponentStory<typeof ExplorePage> = (args) => <ExplorePage {...args as any} ></ExplorePage>

export const Page = Template.bind({});
Page.args = {
}


