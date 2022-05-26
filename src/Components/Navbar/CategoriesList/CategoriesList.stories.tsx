import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Menu, MenuButton } from '@szhsin/react-menu';
import Button from 'src/Components/Button/Button';

import CategoriesList from './CategoriesList';

export default {
  title: 'Shared/Navbar/CategoriesList',
  component: CategoriesList,

} as ComponentMeta<typeof CategoriesList>;

const Template: ComponentStory<typeof CategoriesList> = (args) => <Menu offsetY={24} menuButton={<MenuButton className='text-body4 font-bold hover:text-primary-600'>Open Categories Menu</MenuButton>}>
  <CategoriesList {...args} />
</Menu>;

export const Default = Template.bind({});
Default.args = {
}

