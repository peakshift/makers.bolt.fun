import { ComponentStory, ComponentMeta } from '@storybook/react';

import TextEditor from './TextEditor';

export default {
    title: 'Shared/TextEditor',
    component: TextEditor,

} as ComponentMeta<typeof TextEditor>;

const Template: ComponentStory<typeof TextEditor> = (args) => <TextEditor {...args as any} />


export const Default = Template.bind({});
Default.args = {
    placeholder: "Start writing something in markdown"
}



