
import NotFoundPage from "src/features/Shared/pages/NotFoundPage/NotFoundPage";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import SaveChangesCard from '../SaveChangesCard/SaveChangesCard';
import { toast } from 'react-toastify';
import { NotificationsService } from 'src/services';
import { NetworkStatus } from '@apollo/client';
import { usePrompt } from 'src/utils/hooks';
import { UpdateUserRolesSkillsMutationVariables, useMyProfileRolesSkillsQuery, useUpdateUserRolesSkillsMutation } from 'src/graphql'
import LoadingPage from "src/Components/LoadingPage/LoadingPage";
import UpdateRolesCard from "./UpdateRolesCard/UpdateRolesCard";
import UpdateSkillsCard from "./UpdateSkillsCard/UpdateSkillsCard";


interface Props {
}



export type IRolesSkillsForm = NonNullable<UpdateUserRolesSkillsMutationVariables['data']>;

const schema: yup.SchemaOf<IRolesSkillsForm> = yup.object({
    roles: yup.array().of(
        yup.object().shape({
            id: yup.number().required(),
            role: yup.string().required(),
        }).required()
    ).required(),
    skills: yup.array().of(
        yup.object().shape({
            id: yup.number().required(),
        }).required()
    ).required(),
}).required();

export default function PreferencesTab() {

    const { formState: { isDirty, }, handleSubmit, reset, control } = useForm<IRolesSkillsForm>({
        defaultValues: {
            roles: [],
            skills: [],
        },
        resolver: yupResolver(schema),
    });

    const query = useMyProfileRolesSkillsQuery({
        onCompleted: data => {
            if (data.me) reset(data.me)
        },
        notifyOnNetworkStatusChange: true,
    });
    const [mutate, mutationStatus] = useUpdateUserRolesSkillsMutation();


    usePrompt('You may have some unsaved changes. You still want to leave?', isDirty)


    if (query.networkStatus === NetworkStatus.loading)
        return <LoadingPage />

    if (!query.data || !query.data?.me)
        return <NotFoundPage />

    if (!query.data?.getAllMakersRoles || !query.data?.getAllMakersSkills)
        return null;

    const onSubmit: SubmitHandler<IRolesSkillsForm> = data => {
        const toastId = toast.loading("Saving changes...", NotificationsService.defaultOptions)
        mutate({
            variables: {
                data
            },
            onCompleted: ({ updateProfileRoles }) => {
                if (updateProfileRoles) {
                    reset(updateProfileRoles);
                    toast.update(toastId, { render: "Saved changes successfully", type: "success", ...NotificationsService.defaultOptions, isLoading: false });
                }
            }
        })
            .catch(() => {
                toast.update(toastId, { render: "A network error happened", type: "error", ...NotificationsService.defaultOptions, isLoading: false });
                mutationStatus.reset()
            })
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            <div className="col-span-2 flex flex-col gap-24">
                <Controller
                    control={control}
                    name="roles"
                    render={({ field: { onChange, value } }) => (
                        <UpdateRolesCard
                            allRoles={query.data?.getAllMakersRoles!}
                            value={value}
                            onChange={onChange} />
                    )}
                />
                <Controller
                    control={control}
                    name="skills"
                    render={({ field: { onChange, value } }) => (
                        <UpdateSkillsCard
                            allSkills={query.data?.getAllMakersSkills!}
                            value={value}
                            onChange={onChange} />
                    )}
                />
            </div>
            <div className="self-start sticky-side-element">
                <SaveChangesCard
                    isLoading={mutationStatus.loading}
                    isDirty={isDirty}
                    onSubmit={handleSubmit(onSubmit)}
                    onCancel={() => reset()}
                />
            </div>
        </div>
    )
}
