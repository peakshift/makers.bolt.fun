import { ComponentStory, ComponentMeta } from '@storybook/react';

import FiltersModal from './FiltersModal';

import { ModalsDecorator } from 'src/utils/storybook/decorators';

export default {
    title: 'Projects/Filters Modal',
    component: FiltersModal,

    decorators: [ModalsDecorator]
} as ComponentMeta<typeof FiltersModal>;

const Template: ComponentStory<typeof FiltersModal> = (args) => <FiltersModal {...args} />;

export const Default = Template.bind({});

