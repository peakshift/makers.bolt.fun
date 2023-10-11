import LinkedAccountsCard from "./LinkedAccountsCard/LinkedAccountsCard";
import {
  UpdateUserPreferencesMutationVariables,
  useMyProfilePreferencesQuery,
  useUpdateUserPreferencesMutation,
} from "src/graphql";
import NotFoundPage from "src/features/Shared/pages/NotFoundPage/NotFoundPage";
import PreferencesTabSkeleton from "./PreferencesTab.Skeleton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { NotificationsService } from "src/services";
import { NetworkStatus } from "@apollo/client";
import LinkedEmailsCard from "./LinkedEmailsCard/LinkedEmailsCard";

interface Props {}

export type IProfilePreferencesForm = NonNullable<{
  walletsKeys: UpdateUserPreferencesMutationVariables["newKeys"];
  emails: UpdateUserPreferencesMutationVariables["newEmails"];
}>;

const schema: yup.SchemaOf<IProfilePreferencesForm> = yup
  .object({
    walletsKeys: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            name: yup.string().required(),
            key: yup.string().trim().required(),
          })
          .required()
      )
      .required(),
    emails: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            email: yup.string().required(),
          })
          .required()
      )
      .required(),
  })
  .required();

export default function PreferencesTab() {
  const { handleSubmit, reset, control } = useForm<IProfilePreferencesForm>({
    defaultValues: {
      walletsKeys: [],
      emails: [],
    },
    resolver: yupResolver(schema),
  });

  const query = useMyProfilePreferencesQuery({
    onCompleted: (data) => {
      if (data.me)
        reset({
          walletsKeys: data.me.private_data.walletsKeys,
          emails: data.me.private_data.emails,
        });
    },
    notifyOnNetworkStatusChange: true,
  });
  const [mutate, mutationStatus] = useUpdateUserPreferencesMutation();

  if (query.networkStatus === NetworkStatus.loading)
    return <PreferencesTabSkeleton />;

  if (!query.data?.me) return <NotFoundPage />;

  const onSubmit: SubmitHandler<IProfilePreferencesForm> = (data) => {
    if (!Array.isArray(data.walletsKeys)) return;
    if (!Array.isArray(data.emails)) return;

    const toastId = toast.loading(
      "Saving changes...",
      NotificationsService.defaultOptions
    );

    mutate({
      variables: {
        newKeys: data.walletsKeys.map(({ key, name }) => ({ key, name })),
        newEmails: data.emails.map(({ email }) => ({ email })),
      },
      onCompleted: ({ updateUserPreferences }) => {
        if (updateUserPreferences) {
          reset({
            walletsKeys: updateUserPreferences.private_data.walletsKeys,
            emails: updateUserPreferences.private_data.emails,
          });
          toast.update(toastId, {
            render: "Saved changes successfully",
            type: "success",
            ...NotificationsService.defaultOptions,
            isLoading: false,
          });
        }
      },
    }).catch(() => {
      toast.update(toastId, {
        render: "A network error happened",
        type: "error",
        ...NotificationsService.defaultOptions,
        isLoading: false,
      });
      mutationStatus.reset();
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
      <div className="md:col-span-2 flex flex-col gap-24">
        <Controller
          control={control}
          name="walletsKeys"
          render={({ field: { onChange, value } }) => (
            <LinkedAccountsCard
              value={value as any}
              onChange={(v) => {
                onChange(v);
                handleSubmit(onSubmit)();
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="emails"
          render={({ field: { onChange, value } }) => (
            <LinkedEmailsCard
              value={value as any}
              onChange={(v) => {
                onChange(v);
                handleSubmit(onSubmit)();
              }}
            />
          )}
        />
      </div>
      <div className="self-start sticky-side-element">
        {/* <SaveChangesCard
                    isLoading={mutationStatus.loading}
                    isDirty={isDirty}
                    onSubmit={handleSubmit(onSubmit)}
                    onCancel={() => reset()}
                /> */}
      </div>
    </div>
  );
}
