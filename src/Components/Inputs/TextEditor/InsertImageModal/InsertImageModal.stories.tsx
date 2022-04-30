import { ComponentStory, ComponentMeta } from '@storybook/react';

import InsertImageModal from './InsertImageModal';

import { ModalsDecorator } from 'src/utils/storybook/decorators';

export default {
    title: 'Shared/TextEditor/Insert Image Modal',
    component: InsertImageModal,

    decorators: [ModalsDecorator]
} as ComponentMeta<typeof InsertImageModal>;

const Template: ComponentStory<typeof InsertImageModal> = (args) => <InsertImageModal {...args} />;

export const Default = Template.bind({});

