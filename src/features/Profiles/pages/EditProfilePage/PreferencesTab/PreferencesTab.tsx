import LinkedAccountsCard from './LinkedAccountsCard/LinkedAccountsCard';
import CommentsSettingsCard from './CommentsSettingsCard/CommentsSettingsCard';
import { UpdateUserPreferencesMutationVariables, useMyProfilePreferencesQuery, useUpdateUserPreferencesMutation } from 'src/graphql';
import LoadingPage from 'src/Components/LoadingPage/LoadingPage';
import NotFoundPage from "src/features/Shared/pages/NotFoundPage/NotFoundPage";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import SaveChangesCard from '../SaveChangesCard/SaveChangesCard';
import { toast } from 'react-toastify';
import { NotificationsService } from 'src/services';


interface Props {
}

export type IProfilePreferencesForm = NonNullable<UpdateUserPreferencesMutationVariables>;

const schema: yup.SchemaOf<IProfilePreferencesForm> = yup.object({
    walletsKeys: yup.array().of(yup.object().shape({
        name: yup.string().required(),
        key: yup.string().trim().required(),
    }).required())
        .required(),
}).required();

export default function PreferencesTab() {

    const { register, formState: { errors, isDirty, }, handleSubmit, reset, control } = useForm<IProfilePreferencesForm>({
        defaultValues: {
            walletsKeys: []
        },
        resolver: yupResolver(schema),
        mode: 'onBlur',
    });

    const query = useMyProfilePreferencesQuery({
        onCompleted: data => {
            if (data.me) reset(data.me)
        }
    });
    const [mutate, mutationStatus] = useUpdateUserPreferencesMutation();

    if (query.loading)
        return <LoadingPage />

    if (!query.data?.me)
        return <NotFoundPage />


    const onSubmit: SubmitHandler<IProfilePreferencesForm> = data => {
        if (!Array.isArray(data.walletsKeys))
            return;

        const toastId = toast.loading("Saving changes...", NotificationsService.defaultOptions)


        mutate({
            variables: {
                walletsKeys: data.walletsKeys.map(({ key, name }) => ({ key, name })),
            },
            onCompleted: ({ updateUserPreferences }) => {
                if (updateUserPreferences) {
                    reset(updateUserPreferences);
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
                    name="walletsKeys"
                    render={({ field: { onChange, value } }) => (
                        <LinkedAccountsCard value={value as any} onChange={onChange} />
                    )}
                />
                <CommentsSettingsCard nostr_prv_key={query.data.me.nostr_prv_key} nostr_pub_key={query.data.me.nostr_pub_key} />
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
