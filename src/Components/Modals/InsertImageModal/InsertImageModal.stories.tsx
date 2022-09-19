import { ComponentStory, ComponentMeta } from '@storybook/react';

import InsertImageModal from './InsertImageModal';

import { ModalsDecorator } from 'src/utils/storybook/decorators';

export default {
    title: 'Shared/Inputs/Files Inputs/Image Modal',
    component: InsertImageModal,

    decorators: [ModalsDecorator]
} as ComponentMeta<typeof InsertImageModal>;

const Template: ComponentStory<typeof InsertImageModal> = (args) => <InsertImageModal {...args} />;

export const Default = Template.bind({});
Default.args = {
    callbackAction: {
        type: "INSERT_IMAGE_IN_STORY",
        payload: {
            src: "",
            alt: "",
        }
    }
}

