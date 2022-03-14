import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';

import SearchResults from './SearchResults';

export default {
  title: 'Shared/Navbar/Search/Results List',
  component: SearchResults,

} as ComponentMeta<typeof SearchResults>;

const Template: ComponentStory<typeof SearchResults> = (args) => <div className="max-w-[326px]">
  <SearchResults {...args} />
</div>;

export const HasData = Template.bind({});
HasData.args = {
  projects: MOCK_DATA['projects']
}

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true
}

