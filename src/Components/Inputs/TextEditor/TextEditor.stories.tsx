import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

import TextEditor from './TextEditor';

export default {
    title: 'Shared/TextEditor',
    component: TextEditor,

} as ComponentMeta<typeof TextEditor>;

const Template: ComponentStory<typeof TextEditor> = (args) => {

    const methods = useForm();

    console.log(methods.watch('content'))

    return <FormProvider {...methods}>
        <TextEditor {...args} />
    </FormProvider>
}

export const Default = Template.bind({});
Default.args = {
    placeholder: "Start writing something in markdown"
}



