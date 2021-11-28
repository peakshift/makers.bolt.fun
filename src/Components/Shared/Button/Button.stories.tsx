import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './Button';

export default {
    title: 'Shared/Button',
    component: Button,

} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} >Click Me 🔥</Button>;

export const Default = Template.bind({});


export const Primary = Template.bind({});
Primary.args = {
    color: 'primary'
}

export const Gray = Template.bind({});
Gray.args = {
    color: 'gray'
}


export const MediumSize = Template.bind({});
MediumSize.args = {
    size: 'md'
}

export const FullWidth = Template.bind({});
FullWidth.args = {
    fullWidth: true
}

export const Link = Template.bind({});
Link.args = {
    href: '#'
}