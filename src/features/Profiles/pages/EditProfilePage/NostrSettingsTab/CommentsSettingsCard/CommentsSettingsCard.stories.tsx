import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';
import CommentsSettingsCard from './CommentsSettingsCard';

export default {
    title: 'Profiles/Edit Profile Page/Comments Settings Card',
    component: CommentsSettingsCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },

} as ComponentMeta<typeof CommentsSettingsCard>;


const Template: ComponentStory<typeof CommentsSettingsCard> = (args) => <CommentsSettingsCard {...args} ></CommentsSettingsCard>

export const Default = Template.bind({});
Default.args = {
    nostr_prv_key: "1234389753205473258327580937245",
    nostr_pub_key: "55234231277835473258327580937245",
}
