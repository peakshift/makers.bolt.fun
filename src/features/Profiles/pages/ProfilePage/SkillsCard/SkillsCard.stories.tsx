import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';
import SkillsCard from './SkillsCard';

export default {
    title: 'Profiles/Profile Page/Skills Card',
    component: SkillsCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },

} as ComponentMeta<typeof SkillsCard>;


const Template: ComponentStory<typeof SkillsCard> = (args) => <div className="max-w-[326px]"><SkillsCard {...args} ></SkillsCard></div>

export const Default = Template.bind({});
Default.args = {
    skills: MOCK_DATA['user'].skills
}

export const Empty = Template.bind({});
Empty.args = {
    skills: [],
}

export const EmptyOwner = Template.bind({});
EmptyOwner.args = {
    skills: [],
    isOwner: true
}