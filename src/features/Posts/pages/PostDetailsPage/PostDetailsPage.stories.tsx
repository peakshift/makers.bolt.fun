import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ModifyArgs } from 'src/utils/storybook/utils';
import PostDetailsPage from './PostDetailsPage';

export default {
    title: 'Posts/Post Details Page/Page',
    component: PostDetailsPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    parameters: {
        modifyArgs: {
            router: {
                routePath: "/:type/:id",
                currentPath: "/Story/1"
            }
        } as ModifyArgs
    }
} as ComponentMeta<typeof PostDetailsPage>;


const Template: ComponentStory<typeof PostDetailsPage> = (args) => <PostDetailsPage {...args as any} ></PostDetailsPage>

export const Default = Template.bind({});
Default.args = {
}


