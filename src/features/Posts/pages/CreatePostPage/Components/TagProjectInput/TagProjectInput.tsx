
import Select, { ValueContainerProps } from 'react-select';
import { OnChangeValue, StylesConfig, components, OptionProps, MenuListProps } from "react-select";
import { useMyProjectsQuery, MyProjectsQuery } from "src/graphql";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { createRoute } from "src/utils/routing"
import { FiPlus } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import React from 'react'
import { Link } from 'react-router-dom'


type Project = NonNullable<MyProjectsQuery['me']>['projects'][number]

interface Props {
    classes?: {
        container?: string
        input?: string
    }
    placeholder?: string,
    value?: Project | null
    onChange?: (selectedProject: Project | null) => void
    onBlur?: () => void
}






export default function TagProjectInput({
    classes,
    ...props }: Props) {

    const query = useMyProjectsQuery()

    const placeholder = props.placeholder ?? <div className="flex gap-8 items-center text-gray-500"> <span className="w-32 h-32 bg-gray-50 border border-gray-100 rounded-full flex justify-center items-center"><FiPlus /></span> Tag a project </div>

    const handleChange = (newValue: OnChangeValue<Project, false>,) => {
        props.onChange?.(newValue);
    }

    const isEmpty = query.data?.me?.projects.length === 0

    // if (!props.value && (!query.data?.me?.projects || query.data.me.projects.length === 0)) return null

    return (
        <div className={`${classes?.container}`}>
            <Select
                isLoading={query.loading}
                value={props.value}
                options={query.data?.me?.projects}
                placeholder={placeholder}
                loadingMessage={() => "Loading your projects..."}
                noOptionsMessage={() =>
                    isEmpty ?
                        <div>
                            <div className='text-body1 mb-24'>🚀</div>
                            <p>Looks like you don’t have any projects yet. You can <Link className='text-blue-500' to={createRoute({ type: "edit-project" })} >create a project here.</Link></p>
                        </div>
                        :
                        "No projects here"}
                onChange={handleChange as any}
                components={{
                    MenuList,
                    Option: OptionComponent,
                    ValueContainer,
                }}
                getOptionValue={o => o.id.toString()}
                getOptionLabel={o => o.title}
                onBlur={props.onBlur}
                styles={colourStyles as any}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 8,
                    colors: {
                        ...theme.colors,
                        primary: 'var(--primary)',
                    },
                })}
                isClearable
            />
            {/* <div className="flex mt-16 gap-8 flex-wrap">
                {(value as Tag[]).map((tag, idx) => <Badge color="gray" key={tag.title} onRemove={() => handleRemove(idx)} >{tag.title}</Badge>)}
            </div> */}
        </div>
    )
}


const MenuList = ({
    children,
    ...props
}: MenuListProps<Project, false>) => {
    return (
        <components.MenuList {...props} className='!flex'  >
            {props.options.length > 0 && <p className='mb-8 font-medium'>Your projects ({props.options.length})</p>}
            {children}
        </components.MenuList>
    );
}

const ValueContainer = ({
    children,
    ...props
}: ValueContainerProps<Project, false>) => {
    const { getValue, hasValue } = props;

    const value = getValue()[0]
    return (
        <components.ValueContainer {...props} className='!flex'  >
            {hasValue ?
                <>
                    <div className="flex gap-8 items-center px-8 py-4 border border-gray-200 rounded-8">
                        <Avatar width={32} src={value.thumbnail_image} /> <span className="text-body5 text-gray-900 font-medium">{value.title}</span> <IoMdClose
                            onMouseDown={e => e.stopPropagation()}
                            onClick={(e) => {
                                (props.selectProps.onChange as any)(null);
                            }} />
                    </div>
                    {React.Children.map(children, (child: any) =>
                        child && child.type === components.Input ? child : null
                    )}
                </>
                :
                children
            }
        </components.ValueContainer>
    );
}

const OptionComponent = (props: OptionProps<Project>) => {
    return (
        <>
            <components.Option {...props} >
                <Avatar src={props.data.thumbnail_image} width={48} />
                <div>
                    <p className="font-medium self-center">
                        {props.data.title}
                    </p>
                    <p className="text-body5 text-gray-500">
                        {props.data.category.icon} {props.data.category.title}
                    </p>
                </div>
            </components.Option>
        </>
    );
};


const colourStyles: StylesConfig = {

    control: (styles, state) => ({
        ...styles,
        borderRadius: 12,
        border: 'none',
        boxShadow: 'none',

        ":hover": {
            cursor: "pointer"
        },

    }),
    multiValueRemove: (styles) => ({
        ...styles,
        ":hover": {
            background: 'none'
        }
    }),
    menuList: (styles) => ({
        ...styles,
        borderRadius: 12,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
    }),
    // flex rounded-12 items-center gap-16 !py-16 ${props.isSelected && "!bg-gray-200
    option: (styles, state) => ({
        ...styles,
        display: 'flex',
        paddingInline: 8,
        borderRadius: 12,
        alignContent: 'center',
        paddingBlock: 12,
        gap: 16,
        ...(state.isFocused && { background: "#F9FAFB" }),
        ...(state.isSelected && { background: "#F5F2FF", color: "black" }),

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