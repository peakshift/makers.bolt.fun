import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BsImages } from 'react-icons/bs';
import Button from 'src/Components/Button/Button';

import FilesInput from './FilesInput';

export default {
    title: 'Shared/Files Input',
    component: FilesInput,

} as ComponentMeta<typeof FilesInput>;

const Template: ComponentStory<typeof FilesInput> = (args) => <FilesInput {...args} />


export const Default = Template.bind({});
Default.args = {
}

export const CustomButton = Template.bind({});
CustomButton.args = {
    multiple: true,
    uploadBtn: <Button color='primary'><span className="align-middle">Drop Images</span> <BsImages className='ml-12 scale-125' /></Button>
}