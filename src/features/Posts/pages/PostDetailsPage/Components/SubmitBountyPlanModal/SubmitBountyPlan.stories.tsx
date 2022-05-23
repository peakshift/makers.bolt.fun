import { ComponentStory, ComponentMeta } from '@storybook/react';

import SubmitBountyPlanModal from './SubmitBountyPlanModal';

import { ModalsDecorator } from 'src/utils/storybook/decorators';

export default {
    title: 'Posts/Post Details Page/Components/Submit Bounty Plan',
    component: SubmitBountyPlanModal,

    decorators: [ModalsDecorator]
} as ComponentMeta<typeof SubmitBountyPlanModal>;

const Template: ComponentStory<typeof SubmitBountyPlanModal> = (args) => <SubmitBountyPlanModal {...args} />;

export const Default = Template.bind({});

