import { FormProvider, NestedValue, Resolver, SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Team_Member_Role } from "src/graphql";
import { PropsWithChildren, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { usePrompt } from "src/utils/hooks";


interface Props {

}


export interface IListProjectForm {
    id?: number
    name: string
    website: string
    tagline: string
    description: string
    thumbnail_image?: string
    cover_image?: string
    twitter?: string
    discord?: string
    github?: string
    category_id: number
    capabilities: NestedValue<string[]>
    screenshots: NestedValue<string[]>

    members: NestedValue<{
        id: number,
        name: string,
        jobTitle: string | null,
        avatar: string,
        role: Team_Member_Role,
    }[]>
    recruit_roles: NestedValue<string[]>


    launch_status: "wip" | "launched"
    tournaments: NestedValue<string[]>
}

const schema: yup.SchemaOf<IListProjectForm> = yup.object({
    id: yup.number().optional(),
    name: yup.string().trim().required().min(2),
    website: yup.string().trim().url().required(),
    tagline: yup.string().trim().required().min(10),
    description: yup.string().trim().required().min(50, 'Write at least 10 words descriping your project'),
    thumbnail_image: yup.string().url().ensure(),
    cover_image: yup.string().url().ensure(),
    twitter: yup.string().url().ensure(),
    discord: yup.string().url().ensure(),
    github: yup.string().url().ensure(),
    category_id: yup.number().required("Please choose a category"),
    capabilities: yup.array().of(yup.string().required()).default([]),
    screenshots: yup.array().of(yup.string().required()).default([]),
    members: yup.array().of(yup.object() as any).default([]),
    recruit_roles: yup.array().default([]),
    launch_status: yup.mixed().oneOf(['wip', 'launched']).default('wip'),
    tournaments: yup.array().default([])
}).required();

export default function FormContainer(props: PropsWithChildren<Props>) {

    const [params] = useSearchParams();

    const methods = useForm<IListProjectForm>({
        defaultValues: {
            id: !!params.get('id') ? Number(params.get('id')) : undefined,
            name: "",
            website: "",
            tagline: "",
            description: "",
            thumbnail_image: "",
            cover_image: "",
            twitter: "",
            discord: "",
            github: "",
            category_id: undefined,
            capabilities: [],
            screenshots: [],
            members: [],
            recruit_roles: [],
            launch_status: 'wip',
            tournaments: [],
        },
        resolver: yupResolver(schema) as Resolver<IListProjectForm>,
    });



    const onSubmit: SubmitHandler<IListProjectForm> = data => console.log(data);



    return (
        <FormProvider {...methods} >
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {props.children}
            </form>
        </FormProvider>
    )
}
