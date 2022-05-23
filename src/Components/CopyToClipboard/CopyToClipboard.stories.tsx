import { ComponentStory, ComponentMeta } from '@storybook/react';

import CopyToClipboard from './CopyToClipboard';

export default {
  title: 'Shared/Copy To Clipboard',
  component: CopyToClipboard,

} as ComponentMeta<typeof CopyToClipboard>;

const Template: ComponentStory<typeof CopyToClipboard> = (args) => <div className="flex h-[400px] justify-center items-center"><div className="input-wrapper mt-32 max-w-[320px] mx-auto">
  <input
    type='text'
    className="input-text overflow-ellipsis"
    value={'Some Text To Copy'}
  />
  <CopyToClipboard {...args} text="Some Text To Copy" />
</div></div>;

export const Default = Template.bind({});
Default.args = {
  text: "Some Text To Copy"
}

export const Above = Template.bind({});
Above.args = {
  text: "Some Text To Copy",
  direction: "top"
}

