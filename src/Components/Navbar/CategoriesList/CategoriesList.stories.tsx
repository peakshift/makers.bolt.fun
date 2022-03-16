import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';

import CategoriesList from './CategoriesList';

export default {
  title: 'Shared/Navbar/CategoriesList',
  component: CategoriesList,

} as ComponentMeta<typeof CategoriesList>;

const Template: ComponentStory<typeof CategoriesList> = (args) => <CategoriesList {...args} />;

export const Default = Template.bind({});
Default.args = {
}

