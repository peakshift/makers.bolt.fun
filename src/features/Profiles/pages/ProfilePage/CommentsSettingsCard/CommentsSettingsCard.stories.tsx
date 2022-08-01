import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';
import CommentsSettingsCard from './CommentsSettingsCard';

export default {
    title: 'Profiles/Profile Page/Comments Settings Card',
    component: CommentsSettingsCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },

} as ComponentMeta<typeof CommentsSettingsCard>;


const Template: ComponentStory<typeof CommentsSettingsCard> = (args) => <CommentsSettingsCard {...args} ></CommentsSettingsCard>

export const Default = Template.bind({});
Default.args = {

}
