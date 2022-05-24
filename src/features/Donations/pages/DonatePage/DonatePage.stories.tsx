import { ComponentStory, ComponentMeta } from '@storybook/react';

import DonatePage from './DonatePage';

export default {
    title: 'Donations/Donate Page/Page',
    component: DonatePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof DonatePage>;


const Template: ComponentStory<typeof DonatePage> = (args) => <DonatePage {...args as any} ></DonatePage>

export const Default = Template.bind({});
Default.args = {
}


