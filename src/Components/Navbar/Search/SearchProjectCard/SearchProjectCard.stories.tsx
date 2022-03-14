import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';

import SearchProjectCard from './SearchProjectCard';

export default {
    title: 'Shared/Navbar/Search/Result Project Card',
    component: SearchProjectCard,

} as ComponentMeta<typeof SearchProjectCard>;

const Template: ComponentStory<typeof SearchProjectCard> = (args) => <div className="max-w-[326px]">
    <SearchProjectCard {...args} />
</div>;

export const Default = Template.bind({});
Default.args = {
    project: MOCK_DATA['projects'][0]
}

export const Loading = Template.bind({});
Loading.args = {
    loading: true
}

