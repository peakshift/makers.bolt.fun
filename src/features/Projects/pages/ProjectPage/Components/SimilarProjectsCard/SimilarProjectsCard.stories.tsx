import { ComponentStory, ComponentMeta } from '@storybook/react';

import SimilarProjectsCard from './SimilarProjectsCard';

export default {
    title: 'Projects/Project Page/Similar Projects Card',
    component: SimilarProjectsCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof SimilarProjectsCard>;


const Template: ComponentStory<typeof SimilarProjectsCard> = (args) => <div className="max-w-[326px]"><SimilarProjectsCard {...args as any} ></SimilarProjectsCard></div>

export const Default = Template.bind({});
Default.args = {
}


