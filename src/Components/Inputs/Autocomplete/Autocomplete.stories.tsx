import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useWatch } from 'react-hook-form';
import { WrapForm } from 'src/utils/storybook/decorators';

import Autocomplete from './Autocomplete';

export default {
    title: 'Shared/Inputs/AutoComplete',
    component: Autocomplete,
    decorators: [WrapForm({
        defaultValues: {
            autocomplete: null
        }
    })],

} as ComponentMeta<typeof Autocomplete>;

const options = [
    {
        "id": "20f0eb8d-c0cd-4e12-8a08-0d9846fc8704",
        "name": "Nichole Bailey",
        "username": "Cassie14",
        "email": "Daisy_Auer50@hotmail.com",
        "address": {
            "street": "Anastasia Tunnel",
            "suite": 95587,
            "city": "Port Casperview",
            "zipcode": "04167-6996",
            "geo": {
                "lat": "-73.4727",
                "lng": "-142.9435"
            }
        },
        "phone": "324-615-9195 x5902",
        "website": "ron.net",
        "company": {
            "name": "Roberts, Tremblay and Christiansen",
            "catchPhrase": "Vision-oriented actuating access",
            "bs": "bricks-and-clicks strategize portals"
        }
    },
    {
        "id": "62b70f76-85ba-4241-9ffd-07582008c497",
        "name": "Robert Blick",
        "username": "Madilyn93",
        "email": "Ronaldo82@gmail.com",
        "address": {
            "street": "Charlie Plain",
            "suite": 83070,
            "city": "Lake Bonitaland",
            "zipcode": "01109",
            "geo": {
                "lat": "50.0971",
                "lng": "-2.3057"
            }
        },
        "phone": "1-541-367-2047 x9006",
        "website": "jovani.com",
        "company": {
            "name": "Parisian - Kling",
            "catchPhrase": "Multi-tiered tertiary toolset",
            "bs": "plug-and-play benchmark content"
        }
    },
    {
        "id": "d02f74d9-bf99-4e41-b678-15e903abc1b3",
        "name": "Eli O'Kon",
        "username": "Rosario.Davis",
        "email": "Mckayla59@hotmail.com",
        "address": {
            "street": "Wilford Drive",
            "suite": 69742,
            "city": "North Dianna",
            "zipcode": "80620",
            "geo": {
                "lat": "-61.4191",
                "lng": "126.7878"
            }
        },
        "phone": "(339) 709-4080",
        "website": "clay.name",
        "company": {
            "name": "Gerlach - Metz",
            "catchPhrase": "Pre-emptive user-facing service-desk",
            "bs": "frictionless monetize markets"
        }
    },
    {
        "id": "21077fa6-6a53-4b84-8407-6cd949718945",
        "name": "Marilie Feil",
        "username": "Antwon.Carter92",
        "email": "Demario.Hyatt20@yahoo.com",
        "address": {
            "street": "Kenton Spurs",
            "suite": 20079,
            "city": "Beahanberg",
            "zipcode": "79385",
            "geo": {
                "lat": "-70.7199",
                "lng": "4.6977"
            }
        },
        "phone": "608.750.4947",
        "website": "jacynthe.org",
        "company": {
            "name": "Kuhn and Sons",
            "catchPhrase": "Total eco-centric matrices",
            "bs": "out-of-the-box target communities"
        }
    },
    {
        "id": "e07cf1b4-ff43-4c4a-a670-fd7417d6bbaf",
        "name": "Ella Pagac",
        "username": "Damien.Jaskolski",
        "email": "Delmer1@gmail.com",
        "address": {
            "street": "VonRueden Shoals",
            "suite": 14035,
            "city": "Starkmouth",
            "zipcode": "72448-1915",
            "geo": {
                "lat": "55.2157",
                "lng": "98.0822"
            }
        },
        "phone": "(165) 247-5332 x71067",
        "website": "chad.info",
        "company": {
            "name": "Nicolas, Doyle and Rempel",
            "catchPhrase": "Adaptive real-time strategy",
            "bs": "innovative whiteboard supply-chains"
        }
    }
]
const Template: ComponentStory<typeof Autocomplete> = (args) => {

    const value = useWatch({ name: 'autocomplete' })

    console.log(value);


    return <Autocomplete
        options={options}
        labelField='name'
        valueField='name'
        {...args as any}
    />
}


export const Default = Template.bind({});
Default.args = {
    onChange: console.log
}


export const Lodaing = Template.bind({});
Lodaing.args = {
    isLoading: true
}

export const Clearable = Template.bind({});
Clearable.args = {
    isClearable: true
}

export const MultipleAllowed = Template.bind({});
MultipleAllowed.args = {
    isMulti: true
}

