import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';

import BountyApplicants from './BountyApplicants';

export default {
    title: 'Posts/Post Details Page/Components/Bounty Page Content/Applicants',
    component: BountyApplicants,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof BountyApplicants>;


const Template: ComponentStory<typeof BountyApplicants> = (args) => <div className="max-w-[890px]"><BountyApplicants {...args as any} ></BountyApplicants></div>

export const Default = Template.bind({});
Default.args = {
    applications: MOCK_DATA.posts.bounties[0]['applications']
}


export const Empty = Template.bind({});
Empty.args = {
    applications: []
}



