import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { WithModals } from 'src/utils/storybook/decorators';

import TextEditor from './TextEditor';

export default {
    title: 'Shared/TextEditor',
    decorators: [WithModals],
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
    placeholder: "Start writing something in markdown",
    initialContent: `
## heading2

#### heading4

###### heading6

some text with **bold**, _italic,_ underline, [www.link.com](//www.link.com)

\`code line goes here\`
 
`
}



