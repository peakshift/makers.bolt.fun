import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';
import RolesCard from './RolesCard';

export default {
    title: 'Profiles/Profile Page/Roles Card',
    component: RolesCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },

} as ComponentMeta<typeof RolesCard>;


const Template: ComponentStory<typeof RolesCard> = (args) => <div className="max-w-[326px]"><RolesCard {...args} ></RolesCard></div>

export const Default = Template.bind({});
Default.args = {
    roles: MOCK_DATA['user'].roles
}

export const Empty = Template.bind({});
Empty.args = {
    roles: [],
}

export const EmptyOwner = Template.bind({});
EmptyOwner.args = {
    roles: [],
    isOwner: true
}