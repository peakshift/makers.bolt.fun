import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaCopy } from 'react-icons/fa';
import Button from 'src/Components/Button/Button';
import useCopyToClipboard from 'src/utils/hooks/useCopyToClipboard';
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
    const [mode, setMode] = useState(1); // 1 = editing, 0 = preview
    const [copied, setCopied] = useState(false)

    const copy = useCopyToClipboard();
    const copyToClipboard = () => {
        copy(methods.getValues('content'));
        setCopied(true);
    }

    useEffect(() => {
        let timer: NodeJS.Timer;
        if (copied) {
            timer = setTimeout(() => setCopied(false), 1000)
        }
        return () => {
            clearTimeout(timer)
        }
    }, [copied])


    return <FormProvider {...methods}>
        <div className="max-w-[80ch]">
            <div className="flex gap-16 items-start">
                <div className={`${mode === 0 && 'hidden'} grow`}>
                    <TextEditor {...args} />
                </div>
                <div className={`${mode === 1 && 'hidden'} grow`}>
                    <div className="remirror-theme p-16 border bg-white rounded-16">
                        <div dangerouslySetInnerHTML={{
                            __html: methods.getValues('content')
                        }}>

                        </div>
                    </div>
                </div>
                <Button onClick={() => setMode(v => 1 - v)}>
                    {mode === 1 ? "Preview" : "Edit"}
                </Button>
            </div>

            <Button className='mt-36' onClick={copyToClipboard}>
                <FaCopy /> Copy to clipboard
            </Button>
        </div>
    </FormProvider>
}

export const PreviewAndCopy = PreviewTemplate.bind({});
PreviewAndCopy.args = {
    placeholder: "Start writing something in markdown",
    initialContent: `
<h2 style="">Hello there</h2><p style="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br></p><h2 style="">How are you doing ??</h2><p style="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. <strong>Excepteur</strong> sint <strong>occaecat</strong> cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br><br><br></p><h3 style="">Subheading</h3><p style="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
 
`
}