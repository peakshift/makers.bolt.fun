import { ComponentStory, ComponentMeta } from '@storybook/react';

import Card from './Card';

export default {
    title: 'Shared/Card',
    component: Card,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Card>;


const Template: ComponentStory<typeof Card> = (args) => <Card {...args} > <p className="text-body4 text-gray-700">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas corrupti molestias, accusantium porro vitae mollitia voluptatibus omnis. Itaque assumenda minus cum reprehenderit sit, cupiditate, impedit doloribus ad modi corporis maiores. Corrupti praesentium, dolor vero veniam suscipit architecto accusamus beatae minus iste sed ea harum aperiam quibusdam fugiat molestias dolores magni!</p>
</Card>

export const Default = Template.bind({});


export const Primary = Template.bind({});
Primary.args = {
    onlyMd: true
}
