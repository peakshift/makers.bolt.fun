import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './Button';

export default {
    title: 'Shared/Button',
    component: Button,

} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} >Click Me !!</Button>;

export const Default = Template.bind({});


export const Primary = Template.bind({});
Primary.args = {
    color: 'primary'
}

export const Red = Template.bind({});
Red.args = {
    color: 'red'
}

export const Gray = Template.bind({});
Gray.args = {
    color: 'gray'
}


export const OutlinePrimary = Template.bind({});
OutlinePrimary.args = {
    color: 'primary',
    variant: 'outline'
}

export const OutlineRed = Template.bind({});
OutlineRed.args = {
    color: 'red',
    variant: 'outline'
}

export const OutlineGray = Template.bind({});
OutlineGray.args = {
    color: 'gray',
    variant: 'outline'
}

export const SmallSize = Template.bind({});
SmallSize.args = {
    color: 'primary',
    size: 'sm'
}

export const MediumSize = Template.bind({});
MediumSize.args = {
    color: 'primary',
    size: 'md'
}

export const LargeSize = Template.bind({});
LargeSize.args = {
    color: 'primary',
    size: 'lg'
}

export const FullWidth = Template.bind({});
FullWidth.args = {
    fullWidth: true
}

export const Link = Template.bind({});
Link.args = {
    href: '#'
}

export const DefaultLoading = Template.bind({});
DefaultLoading.args = {
    isLoading: true,
}

export const PrimaryLoading = Template.bind({});
PrimaryLoading.args = {
    isLoading: true,
    color: 'primary'
}

export const GrayLoading = Template.bind({});
GrayLoading.args = {
    isLoading: true,
    color: 'gray'
}