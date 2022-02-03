import { ComponentStory, ComponentMeta } from '@storybook/react';

import Slider from './Slider';

export default {
    title: 'Shared/Slider',
    component: Slider,

} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = (args) => <div className="bg-blue-100 max-w-[600px]"><Slider {...args} >
    <div className="px-64 py-16 bg-gray-300" onClick={() => { alert(1) }}>
        1
    </div>
    <div className="px-64 py-16 bg-gray-300" onClick={() => { alert(2) }}>
        2
    </div>
    <div className="px-64 py-16 bg-gray-300" onClick={() => { alert(3) }}>
        3
    </div>
    <div className="px-64 py-16 bg-gray-300" onClick={() => { alert(4) }}>
        4
    </div>
    <div className="px-64 py-16 bg-gray-300" onClick={() => { alert(5) }}>
        5
    </div>
    <div className="px-64 py-16 bg-gray-300" onClick={() => { alert(6) }}>
        6
    </div>
</Slider></div>;


export const Default = Template.bind({});
Default.args = {
}