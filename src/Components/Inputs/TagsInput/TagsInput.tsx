
import { useController } from "react-hook-form";
import Badge from "src/Components/Badge/Badge";
import CreatableSelect from 'react-select/creatable';
import { OnChangeValue, StylesConfig, components, OptionProps } from "react-select";
import { useOfficialTagsQuery } from "src/graphql";

interface Option {
    readonly label: string;
    readonly value: string;
    readonly icon: string | null
}

type Tag = {
    title: string,
    icon: string | null
}

interface Props {
    classes?: {
        container?: string
        input?: string
    }
    placeholder?: string
    max?: number;
    [k: string]: any
}


const transformer = {
    tagToOption: (tag: Tag): Option => ({ label: tag.title, value: tag.title, icon: tag.icon }),
    optionToTag: (o: Option): Tag => ({ title: o.value, icon: null })
}

const OptionComponent = (props: OptionProps<Option>) => {
    return (
        <div>
            <components.Option {...props} className='flex items-start'>
                <span className={`rounded-8 w-40 h-40 text-center py-8`}>
                    {props.data.icon}
                </span>
                <span className="self-center px-16">
                    {props.data.label}
                </span>
            </components.Option>

        </div>
    );
};

const colourStyles: StylesConfig = {

    control: (styles, state) => ({
        ...styles,
        padding: '1px 4px',
        borderRadius: 8,
    }),
    indicatorSeparator: (styles, state) => ({
        ...styles,
        display: "none"
    }),
    input: (styles, state) => ({
        ...styles,
        " input": {
            boxShadow: 'none !important'
        },
    }),
}


export default function TagsInput({
    classes,
    placeholder = 'Write some tags',
    max = 5,
    ...props }: Props) {

    const officalTags = useOfficialTagsQuery();

    const { field: { value, onChange, onBlur } } = useController({
        name: props.name ?? "tags",
        control: props.control,
    })


    const handleChange = (newValue: OnChangeValue<Option, true>,) => {
        onChange([...value, ...newValue.map(transformer.optionToTag)]);
        onBlur();
    }


    const handleRemove = (idx: number) => {
        onChange((value as Tag[]).filter((_, i) => idx !== i))
        onBlur();
    }


    const maxReached = value.length >= max;

    const tagsOptions = (officalTags.data?.officialTags ?? []).filter(t => !value.some((v: Tag) => v.title === t.title)).map(transformer.tagToOption);

    return (
        <div className={`${classes?.container}`}>
            <CreatableSelect
                isLoading={officalTags.loading}
                options={tagsOptions}
                isMulti
                isDisabled={maxReached}
                placeholder={maxReached ? `Max. ${max} tags reached. Remove a tag to add another.` : placeholder}
                isClearable


                value={[]}
                onChange={handleChange as any}
                onBlur={onBlur}
                components={{
                    Option: OptionComponent,
                    MultiValue: () => <></>
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
            <div className="flex mt-16 gap-8 flex-wrap">
                {(value as Tag[]).map((tag, idx) => <Badge color="gray" key={tag.title} onRemove={() => handleRemove(idx)} >{tag.title}</Badge>)}
            </div>
        </div>
    )
}
