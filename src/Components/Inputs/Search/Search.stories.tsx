import { ComponentStory, ComponentMeta } from '@storybook/react';
import { WrapForm } from 'src/utils/storybook/decorators';

import Search from './Search';

export default {
    title: 'Shared/Inputs/Search',
    component: Search,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [WrapForm({
        defaultValues: {
            tags: [{
                title: "Webln"
            }]
        }
    })]
} as ComponentMeta<typeof Search>;


const Template: ComponentStory<typeof Search> = (args) => <div>
    <p className="text-body4 mb-8 text-gray-700">
        Search for anything on Bolt.fun:
    </p>
    <Search classes={{ input: "max-w-[320px]" }} {...args}></Search>
</div>

export const Default = Template.bind({});
