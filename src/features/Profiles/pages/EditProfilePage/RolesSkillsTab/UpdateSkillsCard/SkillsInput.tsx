

import Select from 'react-select';
import { OnChangeValue, StylesConfig, components, OptionProps } from "react-select";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import { MyProfileRolesSkillsQuery } from 'src/graphql';



type Skill = MyProfileRolesSkillsQuery['getAllMakersSkills'][number]

interface Props {
    classes?: {
        container?: string
        input?: string
    }
    placeholder?: string,
    onSelect?: (selectedUser: Skill) => void
    options: Skill[]
}




// const OptionComponent = (props: OptionProps<Skill>) => {
//     return (
//         <div>
//             <components.Option {...props} className='!flex items-center gap-16 !py-16'>
//                 <Avatar src={props.data.avatar} width={48} />
//                 <div>
//                     <p className="font-medium self-center">
//                         {props.data.name}
//                     </p>
//                     <p className="text-body5 text-gray-500">
//                         {props.data.jobTitle}
//                     </p>
//                 </div>
//             </components.Option>

//         </div>
//     );
// };


const colourStyles: StylesConfig = {

    control: (styles, state) => ({
        ...styles,
        padding: '5px 16px',
        borderRadius: 12,
        // border: 'none',
        // boxShadow: 'none',

        ":hover": {
            cursor: "pointer"
        },
        ":focus-within": {
            '--tw-border-opacity': '1',
            borderColor: 'rgb(179 160 255 / var(--tw-border-opacity))',
            outlineColor: '#9E88FF',
            '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
            '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
            boxShadow: 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
            '--tw-ring-color': 'rgb(179 160 255 / var(--tw-ring-opacity))',
            '--tw-ring-opacity': '0.5'
        }

    }),
    multiValueRemove: (styles) => ({
        ...styles,
        ":hover": {
            background: 'none'
        }
    }),
    indicatorsContainer: () => ({ display: 'none' }),
    clearIndicator: () => ({ display: 'none' }),
    indicatorSeparator: () => ({ display: "none" }),
    input: (styles, state) => ({
        ...styles,
        " input": {
            boxShadow: 'none !important'
        },
    }),
    multiValue: styles => ({
        ...styles,
        padding: '4px 12px',
        borderRadius: 48,
        fontWeight: 500
    }),
    valueContainer: (styles) => ({
        ...styles,
        paddingLeft: 0,
        paddingRight: 0,
    })
}


export default function SkillsInput({
    classes,
    ...props }: Props) {

    const handleChange = (newValue: OnChangeValue<Skill, false>,) => {
        if (newValue)
            props.onSelect?.(newValue);
    }

    return (
        <div className={`${classes?.container}`}>
            <Select
                value={null}
                placeholder={'Search and add skill'}
                options={props.options}
                onChange={handleChange as any}
                styles={colourStyles as any}
                getOptionLabel={o => o?.title!}
                maxMenuHeight={Math.max(200, Math.min(window.innerHeight / 5, 400))}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 8,
                    colors: {
                        ...theme.colors,
                        primary: 'var(--primary)',
                    },
                })}
            />
        </div>
    )
}
