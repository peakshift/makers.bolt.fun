import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MOCK_DATA } from 'src/mocks/data';

import SimilarMakersCard from './SimilarMakersCard';

export default {
    title: 'Profiles/Profile Page/Similar Makers Card',
    component: SimilarMakersCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof SimilarMakersCard>;


const Template: ComponentStory<typeof SimilarMakersCard> = (args) => <div className="max-w-[326px]"><SimilarMakersCard {...args as any} ></SimilarMakersCard></div>

export const Default = Template.bind({});
Default.args = {
    makers: MOCK_DATA['user'].similar_makers
}


