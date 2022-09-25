import { FormProvider, NestedValue, Resolver, SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IsValidProjectHashtagDocument, ProjectDetailsQuery, ProjectLaunchStatusEnum, ProjectPermissionEnum, Team_Member_Role, UpdateProjectInput, useProjectDetailsQuery } from "src/graphql";
import { PropsWithChildren } from "react";
import { useSearchParams } from "react-router-dom";
import { usePrompt } from "src/utils/hooks";
import { imageSchema } from "src/utils/validation";
import { Override } from "src/utils/interfaces";
import LoadingPage from "src/Components/LoadingPage/LoadingPage";
import { apolloClient } from "src/utils/apollo";
import { store } from "src/redux/store";
import UpdateProjectContextProvider from './updateProjectContext'
import { useNavigate } from 'react-router-dom'
import { createRoute } from 'src/utils/routing'


interface Props {

}

export type IListProjectForm = Override<UpdateProjectInput, {
    members: NestedValue<ProjectMember[]>
    capabilities: NestedValue<UpdateProjectInput['capabilities']>
    recruit_roles: NestedValue<UpdateProjectInput['recruit_roles']>
    tournaments: NestedValue<UpdateProjectInput['tournaments']>
    cover_image: NestedValue<UpdateProjectInput['cover_image']>
    thumbnail_image: NestedValue<UpdateProjectInput['thumbnail_image']>
}>

export type ProjectMember = {
    id: number,
    name: string,
    jobTitle: string | null,
    avatar: string,
    role: Team_Member_Role,
}

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
    lightning_address: yup
        .string()
        .test({
            name: "is valid lightning_address",
            test: async value => {
                try {
                    if (value) {
                        const [name, domain] = value.split("@");
                        const lnurl = `https://${domain}/.well-known/lnurlp/${name}`;
                        const res = await fetch(lnurl);
                        if (res.status === 200) return true;
                    }
                    return true;
                } catch (error) {
                    return false;
                }
            }
        })
        .nullable()
        .label("lightning address"),
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
    const navigate = useNavigate()


    const methods = useForm<IListProjectForm>({
        defaultValues: {
            cover_image: undefined,
            thumbnail_image: undefined,
            id: isUpdating ? id : undefined,
            title: "",
            website: "",
            tagline: "",
            description: "",
            category_id: undefined,
            capabilities: [],
            screenshots: [],
            members: prepareMembers([]),
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
                if (!res.getProject.permissions.includes(ProjectPermissionEnum.UpdateInfo))
                    navigate({ pathname: createRoute({ type: "projects-page" }) })
                else
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
                        lightning_address:data.lightning_address,
                        category_id: data.category.id,
                        capabilities: data.capabilities.map(c => c.id),
                        screenshots: data.screenshots.map(url => ({ url })),

                        members: prepareMembers(data.members),
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
            <UpdateProjectContextProvider permissions={query.data?.getProject.permissions ?? Object.values(ProjectPermissionEnum)}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    {props.children}
                </form>
            </UpdateProjectContextProvider>
        </FormProvider>
    )
}


function prepareMembers(members: ProjectDetailsQuery['getProject']['members']): ProjectMember[] {

    const me = store.getState().user.me;

    if (!me) {
        window.location.href = '/login';
        return [];
    }

    if (members.length === 0)
        return [{
            id: me.id,
            avatar: me.avatar,
            name: me.name,
            jobTitle: me.jobTitle,
            role: Team_Member_Role.Owner,
        }]

    const _members = members.map(({ role, user }) => ({ role, id: user.id, avatar: user.avatar, name: user.name, jobTitle: user.jobTitle }))

    const myMember = _members.find(m => m.id === me.id);

    if (!myMember) throw new Error("Not a member of the project")

    return [myMember, ..._members.filter(m => m.id !== me.id)]
}