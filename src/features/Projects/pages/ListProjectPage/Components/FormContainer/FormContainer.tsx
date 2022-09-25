import { FormProvider, NestedValue, Resolver, SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IsValidProjectHashtagDocument, ProjectLaunchStatusEnum, Team_Member_Role, UpdateProjectInput, useProjectDetailsQuery } from "src/graphql";
import { PropsWithChildren } from "react";
import { useSearchParams } from "react-router-dom";
import { usePrompt } from "src/utils/hooks";
import { imageSchema } from "src/utils/validation";
import { Override } from "src/utils/interfaces";
import LoadingPage from "src/Components/LoadingPage/LoadingPage";
import { apolloClient } from "src/utils/apollo";


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
        )
        .test({
            name: "is unique hashtag",
            test: async (value, context) => {
                // TODO: debounce this validation function
                try {
                    const res = await apolloClient.query({
                        query: IsValidProjectHashtagDocument,
                        variables: {
                            hashtag: value,
                            projectId: context.parent.id
                        }
                    })
                    if (res.data.checkValidProjectHashtag) return true;
                    return false;
                } catch (error) {
                    return false;
                }
            },
            message: "This hashtag is already used by another project"
        }),
    website: yup.string().trim().url().required().label("project's link"),
    tagline: yup.string().trim().required().min(10),
    description: yup.string().trim().required().min(50, 'Write at least 10 words descriping your project'),
    thumbnail_image: imageSchema.required("Please pick a thumbnail image").default(undefined),
    cover_image: imageSchema.required("Please pick a cover image").default(undefined),
    twitter: yup.string().url().nullable(),
    discord: yup.string().url().nullable(),
    github: yup.string().url().nullable(),
    slack: yup.string().url().nullable(),
    telegram: yup.string().url().nullable(),
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

    const id = Number(params.get('id'));
    const isUpdating = !Number.isNaN(id);



    const methods = useForm<IListProjectForm>({
        defaultValues: {
            cover_image: undefined,
            thumbnail_image: undefined,
            id: isUpdating ? id : undefined,
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


    const query = useProjectDetailsQuery({
        variables: {
            projectId: id
        },
        skip: !isUpdating,
        onCompleted: (res) => {
            if (res.getProject) {
                const data = res.getProject
                methods.reset({
                    id: data.id,
                    title: data.title,
                    cover_image: { url: data.cover_image },
                    thumbnail_image: { url: data.thumbnail_image },
                    tagline: data.tagline,
                    website: data.website,
                    description: data.description,
                    hashtag: data.hashtag,
                    twitter: data.twitter,
                    discord: data.discord,
                    slack: data.slack,
                    telegram: data.telegram,
                    github: data.github,
                    category_id: data.category.id,
                    capabilities: data.capabilities.map(c => c.id),
                    screenshots: data.screenshots.map(url => ({ url })),

                    members: data.members.map(({ role, user }) => ({ role, id: user.id, avatar: user.avatar, name: user.name, jobTitle: user.jobTitle })),
                    recruit_roles: data.recruit_roles.map(r => r.id),

                    tournaments: [],
                    launch_status: data.launch_status,
                })
            }
        }
    })


    usePrompt('You may have some unsaved changes. You still want to leave?', methods.formState.isDirty)

    const onSubmit: SubmitHandler<IListProjectForm> = data => console.log(data);


    if (query.loading)
        return <LoadingPage />

    return (
        <FormProvider {...methods} >
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {props.children}
            </form>
        </FormProvider>
    )
}
