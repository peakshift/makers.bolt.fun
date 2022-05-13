import { ComponentStory, ComponentMeta } from '@storybook/react';
import { WithModals } from 'src/utils/storybook/decorators';

import BountyForm from './BountyForm';

export default {
    title: 'Posts/Create Post Page/Bounty Form',
    component: BountyForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [WithModals]
} as ComponentMeta<typeof BountyForm>;


const Template: ComponentStory<typeof BountyForm> = (args) => <div className="max-w-[1000px]"><BountyForm {...args as any} ></BountyForm></div>

export const Default = Template.bind({});
Default.args = {
}


