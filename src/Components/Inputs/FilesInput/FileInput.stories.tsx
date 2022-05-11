import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BsImages } from 'react-icons/bs';
import Button from 'src/Components/Button/Button';

import FilesInput from './FilesInput';
import FileDropInput from './FilesDropInput';

export default {
    title: 'Shared/Files Input',
    component: FilesInput,

} as ComponentMeta<typeof FilesInput>;

const Template: ComponentStory<typeof FilesInput> = (args) => <FilesInput {...args} />


export const DefaultButton = Template.bind({});
DefaultButton.args = {
}

export const CustomizedButton = Template.bind({});
CustomizedButton.args = {
    multiple: true,
    uploadBtn: <Button color='primary'><span className="align-middle">Drop Images</span> <BsImages className='ml-12 scale-125' /></Button>
}

const DropTemplate: ComponentStory<typeof FileDropInput> = (args) => <div className="max-w-[500px]"><FileDropInput {...args as any} /></div>
export const DropZoneInput = DropTemplate.bind({});
DropZoneInput.args = {
    onChange: () => { },
}