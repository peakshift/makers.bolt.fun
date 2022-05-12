import { ComponentStory, ComponentMeta } from '@storybook/react';
import { WrapForm } from 'src/utils/storybook/decorators';

import TagsInput from './TagsInput';

export default {
    title: 'Shared/Inputs/Tags Input',
    component: TagsInput,
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
} as ComponentMeta<typeof TagsInput>;


const Template: ComponentStory<typeof TagsInput> = (args) => <div>
    <p className="text-body4 mb-8 text-gray-700">
        Enter Tags:
    </p>
    <TagsInput classes={{ input: "max-w-[320px]" }} {...args}></TagsInput>
</div>

export const Default = Template.bind({});
