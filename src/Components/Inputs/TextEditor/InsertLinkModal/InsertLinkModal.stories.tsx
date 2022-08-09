import { ComponentStory, ComponentMeta } from '@storybook/react';

import InsertLinkModal from './InsertLinkModal';

import { ModalsDecorator } from 'src/utils/storybook/decorators';

export default {
    title: 'Shared/Inputs/Text Editor/Insert Link Modal',
    component: InsertLinkModal,

    decorators: [ModalsDecorator]
} as ComponentMeta<typeof InsertLinkModal>;

const Template: ComponentStory<typeof InsertLinkModal> = (args) => <InsertLinkModal {...args} />;

export const Default = Template.bind({});

