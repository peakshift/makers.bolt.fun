import { ComponentStory, ComponentMeta } from '@storybook/react';

import Badge from './Badge';

export default {
    title: 'Shared/Badge',
    component: Badge,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Badge>;


const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} >Badge</Badge>

export const Default = Template.bind({});


export const Primary = Template.bind({});
Primary.args = {
    color: 'primary'
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

export const Removable = Template.bind({});
Removable.args = {
    color: 'primary',
    onRemove: () => { }
}

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true
}



export const Customized = Template.bind({});
Customized.args = {
    href: "#",
    color: 'none',
    className: 'bg-red-500 text-white underline font-bold'
}




const ListTemplate: ComponentStory<typeof Badge> = (args) => <div className="flex gap-8">
    {Array(4).fill(0).map((_, idx) => <Badge key={idx} {...args} >Badge {idx + 1}</Badge>)}
</div>

export const BadgesList = ListTemplate.bind({})