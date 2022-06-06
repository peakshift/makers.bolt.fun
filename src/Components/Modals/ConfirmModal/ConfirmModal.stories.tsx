import { ComponentStory, ComponentMeta } from '@storybook/react';

import ConfirmModal from './ConfirmModal';

import { ModalsDecorator } from 'src/utils/storybook/decorators';

export default {
    title: 'Shared/Modals/Confirm Modal',
    component: ConfirmModal,

    decorators: [ModalsDecorator]
} as ComponentMeta<typeof ConfirmModal>;

const Template: ComponentStory<typeof ConfirmModal> = (args) => <ConfirmModal {...args} />;

export const Default = Template.bind({});


export const Warning = Template.bind({});
Warning.args = {
    color: 'yellow',
    title: "Warning !!",
    message: "This is a warning message about something, proceed with caution",
    actionName: "Proceed"
}


export const Info = Template.bind({});
Info.args = {
    color: 'blue',
    title: "Info message",
    message: "This is a info message about something, read carefully, This is a info message about something, read carefully, This is a info message about something, read carefully, This is a info message about something, read carefully",
    actionName: "I Agree"
}

