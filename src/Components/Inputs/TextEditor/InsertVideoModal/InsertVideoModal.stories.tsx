import { ComponentStory, ComponentMeta } from '@storybook/react';

import InsertVideoModal from './InsertVideoModal';

import { ModalsDecorator } from 'src/utils/storybook/decorators';

export default {
    title: 'Shared/Inputs/Text Editor/Insert Video Modal',
    component: InsertVideoModal,

    decorators: [ModalsDecorator]
} as ComponentMeta<typeof InsertVideoModal>;

const Template: ComponentStory<typeof InsertVideoModal> = (args) => <InsertVideoModal {...args} />;

export const Default = Template.bind({});

