import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';
import UpdateSkillsCard from './UpdateSkillsCard';

export default {
    title: 'Profiles/Edit Profile Page/Update Skills Card',
    component: UpdateSkillsCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },

} as ComponentMeta<typeof UpdateSkillsCard>;


const Template: ComponentStory<typeof UpdateSkillsCard> = (args) => <UpdateSkillsCard {...args} ></UpdateSkillsCard>

export const Default = Template.bind({});
Default.args = {
    value: MOCK_DATA['user'].skills,
    onChange: () => { }
}
