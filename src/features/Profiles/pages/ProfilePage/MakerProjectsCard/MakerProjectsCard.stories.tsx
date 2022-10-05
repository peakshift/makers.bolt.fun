import { ComponentStory, ComponentMeta } from '@storybook/react';

import MakerProjectsCard from './MakerProjectsCard';

export default {
    title: 'Profiles/Profile Page/Projects Card',
    component: MakerProjectsCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MakerProjectsCard>;


const Template: ComponentStory<typeof MakerProjectsCard> = (args) => <div className="max-w-[326px]"><MakerProjectsCard {...args as any} ></MakerProjectsCard></div>

export const Default = Template.bind({});
Default.args = {
}


