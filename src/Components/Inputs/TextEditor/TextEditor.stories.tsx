import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { WithModals } from 'src/utils/storybook/decorators';

import TextEditor from './TextEditor';

export default {
    title: 'Shared/Inputs/Text Editor',
    decorators: [WithModals],
    component: TextEditor,

} as ComponentMeta<typeof TextEditor>;

const Template: ComponentStory<typeof TextEditor> = (args) => {

    const methods = useForm();
    console.log(methods.watch('content'))

    return <FormProvider {...methods}>
        <div className="max-w-[80ch]">
            <TextEditor {...args} />
        </div>
    </FormProvider>
}

export const Default = Template.bind({});
Default.args = {
    placeholder: "Start writing something in markdown",
    initialContent: `
## heading2

#### heading4

###### heading6

some text with **bold**, _italic,_ underline, [www.link.com](//www.link.com)

\`code line goes here\`
 
`
}




const PreviewTemplate: ComponentStory<typeof TextEditor> = (args) => {

    const methods = useForm({
        defaultValues: {
            content: ""
        }
    });

    const md = methods.watch('content')
    console.log(md);


    return <FormProvider {...methods}>
        <div className="max-w-[80ch]">
            <TextEditor {...args} />
            <div
                className="mt-32 bg-white p-32 border rounded-12 remirror-theme"
                dangerouslySetInnerHTML={{ __html: md }}
            >
            </div>
        </div>
    </FormProvider>
}

export const WithPreview = PreviewTemplate.bind({});
WithPreview.args = {
    placeholder: "Start writing something in markdown",
    initialContent: `
## heading2

#### heading4

###### heading6

some text with **bold**, _italic,_ underline, [www.link.com](//www.link.com)

\`code line goes here\`
 
`
}