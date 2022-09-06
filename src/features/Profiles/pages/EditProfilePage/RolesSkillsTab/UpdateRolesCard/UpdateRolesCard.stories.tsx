import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';
import UpdateRolesCard from './UpdateRolesCard';

export default {
    title: 'Profiles/Edit Profile Page/Update Roles Card',
    component: UpdateRolesCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },

} as ComponentMeta<typeof UpdateRolesCard>;


const Template: ComponentStory<typeof UpdateRolesCard> = (args) => <UpdateRolesCard {...args} ></UpdateRolesCard>

export const Default = Template.bind({});
Default.args = {
    value: MOCK_DATA['user'].roles,
    onChange: () => { }
}
