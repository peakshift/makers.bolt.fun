import { FormProvider, NestedValue, Resolver, SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProjectLaunchStatusEnum, Team_Member_Role, UpdateProjectInput } from "src/graphql";
import { PropsWithChildren, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { usePrompt } from "src/utils/hooks";
import { imageSchema } from "src/utils/validation";
import { Override } from "src/utils/interfaces";


interface Props {

}

export type IListProjectForm = Override<UpdateProjectInput, {
    members: NestedValue<{
        id: number,
        name: string,
        jobTitle: string | null,
        avatar: string,
        role: Team_Member_Role,
    }[]>
    capabilities: NestedValue<UpdateProjectInput['capabilities']>
    recruit_roles: NestedValue<UpdateProjectInput['recruit_roles']>
    tournaments: NestedValue<UpdateProjectInput['tournaments']>
    cover_image: NestedValue<UpdateProjectInput['cover_image']>
    thumbnail_image: NestedValue<UpdateProjectInput['thumbnail_image']>
}>

const schema: yup.SchemaOf<IListProjectForm> = yup.object({
    id: yup.number().optional(),
    title: yup.string().trim().required().min(2),
    hashtag: yup
        .string()
        .required()
        .matches(
            /^(?:#)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:(?!))){0,28}(?:[A-Za-z0-9_]))?)((?: #)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?))*$/,
            "Invalid format for hashtag"
        ),
    website: yup.string().trim().url().required().label("project's link"),
    tagline: yup.string().trim().required().min(10),
    description: yup.string().trim().required().min(50, 'Write at least 10 words descriping your project'),
    thumbnail_image: imageSchema.required("Please pick a thumbnail image").default(undefined),
    cover_image: imageSchema.required("Please pick a cover image").default(undefined),
    twitter: yup.string().url(),
    discord: yup.string().url(),
    github: yup.string().url(),
    slack: yup.string().url(),
    telegram: yup.string().url(),
    category_id: yup.number().required("Please choose a category"),
    capabilities: yup.array().of(yup.number().required()).default([]),
    screenshots: yup.array().of(imageSchema.required()).default([]),
    members: yup.array().of(yup.object() as any).default([]),
    recruit_roles: yup.array().of(yup.number().required()).default([]),
    launch_status: yup.mixed().oneOf([ProjectLaunchStatusEnum.Wip, ProjectLaunchStatusEnum.Launched]).default(ProjectLaunchStatusEnum.Wip),
    tournaments: yup.array().of(yup.number().required()).default([])
}).required();

export default function FormContainer(props: PropsWithChildren<Props>) {

    const [params] = useSearchParams();

    const methods = useForm<IListProjectForm>({
        defaultValues: {
            cover_image: undefined,
            thumbnail_image: undefined,
            id: !!params.get('id') ? Number(params.get('id')) : undefined,
            title: "",
            website: "",
            tagline: "",
            description: "",
            twitter: "",
            discord: "",
            github: "",
            category_id: undefined,
            capabilities: [],
            screenshots: [],
            members: [],
            recruit_roles: [],
            launch_status: ProjectLaunchStatusEnum.Wip,
            tournaments: [],
        },
        resolver: yupResolver(schema) as Resolver<IListProjectForm>,
    });


    usePrompt('You may have some unsaved changes. You still want to leave?', methods.formState.isDirty)

    const onSubmit: SubmitHandler<IListProjectForm> = data => console.log(data);



    return (
        <FormProvider {...methods} >
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {props.children}
            </form>
        </FormProvider>
    )
}
