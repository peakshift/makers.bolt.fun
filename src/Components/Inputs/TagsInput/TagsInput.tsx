
import { useController } from "react-hook-form";
// import CreatableSelect from 'react-select/creatable';
import Select from 'react-select'
import { OnChangeValue, StylesConfig, components, OptionProps } from "react-select";
import { OfficialTagsQuery, useOfficialTagsQuery } from "src/graphql";
import React from "react";

interface Option {
    readonly label: string;
    readonly value: string;
    readonly icon: string | null
    readonly description: string | null
}


type Tag = Omit<OfficialTagsQuery['officialTags'][number], 'id'>
type Value = { title: Tag['title'] }

interface Props {
    classes?: {
        container?: string
        input?: string
    }
    placeholder?: string
    max?: number;
    value: Value[];
    onChange?: (new_value: Value[]) => void;
    onBlur?: () => void;
    [k: string]: any
}



export default function TagsInput({
    classes,
    placeholder = 'Write some tags',
    max = 5,
    value,
    onChange,
    onBlur,
    ...props }: Props) {

    const officalTags = useOfficialTagsQuery();


    const handleChange = (newValue: OnChangeValue<Option, true>,) => {
        onChange?.([...newValue.map(transformer.optionToTag)]);
        onBlur?.();
    }



    const maxReached = value.length >= max;

    const currentPlaceholder = maxReached ? '' : value.length > 0 ? "Add Another..." : placeholder;

    const tagsOptions = !maxReached ? (officalTags.data?.officialTags ?? []).filter(t => !value.some((v) => v.title === t.title)).map(transformer.tagToOption) : [];

    return (
        <div className={`${classes?.container}`}>
            <Select
                isLoading={officalTags.loading}
                options={tagsOptions}
                isMulti
                isOptionDisabled={() => maxReached}
                placeholder={currentPlaceholder}
                noOptionsMessage={() => {
                    return maxReached
                        ? "You've reached the max number of tags."
                        : "No tags available";
                }}
                closeMenuOnSelect={false}
                value={value.map(transformer.valueToOption)}
                onChange={handleChange as any}
                onBlur={onBlur}
                components={{
                    Option: OptionComponent,
                    // ValueContainer: CustomValueContainer
                }}
                styles={colourStyles as any}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 8,
                    colors: {
                        ...theme.colors,
                        primary: 'var(--primary)',
                    },
                })}
            />
            {/* <div className="flex mt-16 gap-8 flex-wrap">
                {(value as Tag[]).map((tag, idx) => <Badge color="gray" key={tag.title} onRemove={() => handleRemove(idx)} >{tag.title}</Badge>)}
            </div> */}
        </div>
    )
}


const transformer = {
    valueToOption: (tag: Value): Option => ({ label: tag.title, value: tag.title, icon: null, description: null }),
    tagToOption: (tag: Tag): Option => ({ label: tag.title, value: tag.title, icon: tag.icon, description: tag.description }),
    optionToTag: (o: Option): Tag => ({ title: o.value, icon: o.icon, description: o.description, })
}

const OptionComponent = (props: OptionProps<Option>) => {
    return (
        <div>
            <components.Option {...props} className='!flex items-center gap-16 !py-16'>
                <div className={`rounded-8 w-40 h-40 text-center py-8 shrink-0 bg-gray-100`}>
                    {props.data.icon}
                </div>
                <div>
                    <p className="font-medium self-center">
                        {props.data.label}
                    </p>
                    <p className="text-body5 text-gray-500">
                        {props.data.description}
                    </p>
                </div>
            </components.Option>

        </div>
    );
};

const { ValueContainer, Placeholder } = components;
const CustomValueContainer = ({ children, ...props }: any) => {

    return (
        <ValueContainer {...props}>
            {React.Children.map(children, child =>
                child && child.type !== Placeholder ? child : null
            )}
            <Placeholder {...props} isFocused={props.isFocused}>
                {props.selectProps.placeholder}
            </Placeholder>
        </ValueContainer>
    );
};

const colourStyles: StylesConfig = {

    control: (styles, state) => ({
        ...styles,
        padding: '1px 0',
        border: 'none',
        boxShadow: 'none',

        ":hover": {
            cursor: "pointer"
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
