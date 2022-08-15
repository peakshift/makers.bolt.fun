import { ComponentStory, ComponentMeta } from '@storybook/react';
import { WrapForm } from 'src/utils/storybook/decorators';

import UsersInput from './UsersInput';

export default {
    title: 'Shared/Inputs/Users Input',
    component: UsersInput,
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
} as ComponentMeta<typeof UsersInput>;


const Template: ComponentStory<typeof UsersInput> = (args) => <div>
    <p className="text-body4 mb-8 text-gray-700">
        Search for users:
    </p>
    <UsersInput classes={{ input: "max-w-[320px]" }} {...args}></UsersInput>
</div>

export const Default = Template.bind({});
