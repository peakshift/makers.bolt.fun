import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  useUpdateProfileAboutMutation,
  useMyProfileAboutQuery,
  UpdateProfileAboutMutationVariables,
  UserBasicInfoFragmentDoc,
} from "src/graphql";
import { NotificationsService } from "src/services/notifications.service";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useWindowPrompt } from "src/utils/hooks";
import SaveChangesCard from "../SaveChangesCard/SaveChangesCard";
import { toast } from "react-toastify";
import Card from "src/Components/Card/Card";
import NotFoundPage from "src/features/Shared/pages/NotFoundPage/NotFoundPage";
import { setUser } from "src/redux/features/user.slice";
import UpdateProfileAboutTabSkeleton from "./BasicProfileInfoTab.Skeleton";
import { useApolloClient } from "@apollo/client";
import AvatarInput from "src/Components/Inputs/FilesInputs/AvatarInput/AvatarInput";
import { imageSchema } from "src/utils/validation";
import { extractErrorMessage } from "src/utils/helperFunctions";
import axios from "axios";

interface Props {}

type IFormInputs = NonNullable<UpdateProfileAboutMutationVariables["data"]>;

const schema: yup.SchemaOf<IFormInputs> = yup
  .object({
    name: yup.string().trim().required().min(2),
    avatar: imageSchema.required(),
    bio: yup.string().ensure(),
    email: yup.string().email().ensure(),
    github: yup.string().ensure(),
    discord: yup.string().ensure(),
    jobTitle: yup.string().ensure(),
    lightning_address: yup
      .string()
      .test({
        name: "is valid lightning_address",
        test: async (value) => {
          try {
            if (value) {
              const [name, domain] = value.split("@");
              const lnurl = `https://cors-here.peakshift.workers.dev/?url=https://${domain}/.well-known/lnurlp/${name}`;
              const res = await axios.get(lnurl);

              if (res.status === 200) return true;
              return false;
            }
            return true;
          } catch (error) {
            return false;
          }
        },
      })
      .ensure()
      .label("lightning address"),
    linkedin: yup.string().ensure(),
    location: yup.string().ensure(),
    twitter: yup.string().ensure(),
    website: yup.string().url().ensure(),
  })
  .required();

export default function BasicProfileInfoTab() {
  const {
    register,
    formState: { errors, isDirty, dirtyFields },
    handleSubmit,
    reset,
    control,
  } = useForm<IFormInputs>({
    defaultValues: {},
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const apolloClient = useApolloClient();
  const profileQuery = useMyProfileAboutQuery({
    onCompleted: (data) => {
      if (data.me) reset({ ...data.me, avatar: { url: data.me.avatar } });
    },
  });
  const [mutate, mutationStatus] = useUpdateProfileAboutMutation();

  const dispatch = useAppDispatch();

  useWindowPrompt(isDirty);

  if (profileQuery.loading) return <UpdateProfileAboutTabSkeleton />;

  if (!profileQuery.data?.me) return <NotFoundPage />;

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const toastId = toast.loading(
      "Saving changes...",
      NotificationsService.defaultOptions
    );

    mutate({
      variables: {
        data: {
          name: data.name,
          avatar: data.avatar,
          jobTitle: data.jobTitle,
          bio: data.bio,
          email: data.email,
          discord: data.discord,
          github: data.github,
          linkedin: data.linkedin,
          lightning_address: data.lightning_address,
          location: data.location,
          twitter: data.twitter,
          website: data.website,
        },
      },
      onCompleted: ({ updateProfileDetails: data }) => {
        if (data) {
          dispatch(setUser(data));
          reset({ ...data, avatar: { url: data.avatar } });
          apolloClient.writeFragment({
            id: `User:${data?.id}`,
            data,
            fragment: UserBasicInfoFragmentDoc,
          });
          toast.update(toastId, {
            render: "Saved changes successfully",
            type: "success",
            ...NotificationsService.defaultOptions,
            isLoading: false,
          });
        }
      },
    }).catch((error) => {
      toast.update(toastId, {
        render: extractErrorMessage(error) ?? "A network error happened",
        type: "error",
        ...NotificationsService.defaultOptions,
        isLoading: false,
      });
      mutationStatus.reset();
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
      <Card className="md:col-span-2" defaultPadding={false}>
        <div className="bg-gray-600 relative h-[160px] rounded-t-16">
          <div className="absolute left-24 bottom-0 translate-y-1/2">
            <Controller
              control={control}
              name="avatar"
              render={({ field: { onChange, value } }) => (
                <AvatarInput value={value} onChange={onChange} width={120} />
              )}
            />
          </div>
        </div>
        <div className="p-16 md:p-24 mt-64">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name-input" className="text-body5 font-medium">
              Name
            </label>
            <div
              className={`input-wrapper mt-8 relative ${
                dirtyFields.name && `bg-primary-50`
              }`}
            >
              <input
                id="name-input"
                autoFocus
                type="text"
                className="input-text"
                placeholder="John Doe"
                aria-invalid={errors.name ? "true" : "false"}
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p role="alert" className="input-error">
                {errors.name.message}
              </p>
            )}
            <label
              htmlFor="bio-input"
              className="text-body5 mt-16 font-medium inline-block"
            >
              Bio
            </label>
            <div
              className={`input-wrapper mt-8 relative ${
                dirtyFields.bio && `bg-primary-50`
              }`}
            >
              <textarea
                id="bio-input"
                rows={4}
                className="input-text"
                placeholder="Tell others a little bit about yourself"
                aria-invalid={errors.bio ? "true" : "false"}
                {...register("bio")}
              />
            </div>
            {errors.bio && (
              <p role="alert" className="input-error">
                {errors.bio.message}
              </p>
            )}
            <label
              htmlFor="jobTitle-input"
              className="text-body5 mt-16 font-medium inline-block"
            >
              Job Title
            </label>
            <div
              className={`input-wrapper mt-8 relative ${
                dirtyFields.jobTitle && `bg-primary-50`
              }`}
            >
              <input
                id="jobTitle-input"
                type="text"
                className="input-text"
                placeholder="Back-end Developer"
                aria-invalid={errors.jobTitle ? "true" : "false"}
                {...register("jobTitle")}
              />
            </div>
            {errors.jobTitle && (
              <p role="alert" className="input-error">
                {errors.jobTitle.message}
              </p>
            )}
            <label
              htmlFor="location-input"
              className="text-body5 mt-16 font-medium inline-block"
            >
              Location
            </label>
            <div
              className={`input-wrapper mt-8 relative ${
                dirtyFields.location && `bg-primary-50`
              }`}
            >
              <input
                id="location-input"
                type="text"
                className="input-text"
                placeholder="UK, London"
                aria-invalid={errors.location ? "true" : "false"}
                {...register("location")}
              />
            </div>
            {errors.location && (
              <p role="alert" className="input-error">
                {errors.location.message}
              </p>
            )}
            <label
              htmlFor="email-input"
              className="text-body5 mt-16 font-medium inline-block"
            >
              Email
            </label>
            <div
              className={`input-wrapper mt-8 relative ${
                dirtyFields.email && `bg-primary-50`
              }`}
            >
              <input
                id="email-input"
                type="text"
                className="input-text"
                placeholder="johndoe@gmail.com"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p role="alert" className="input-error">
                {errors.email.message}
              </p>
            )}
            <p className="text-body6 text-gray-400 mt-8 max-w-[70ch]">
              Your email is visible only to you, we will only use it to send you
              important updates or notices. No spam!
            </p>

            <label
              htmlFor="twitter-input"
              className="text-body5 mt-16 font-medium inline-block"
            >
              Twitter handle
            </label>
            <div
              className={`input-wrapper mt-8 relative ${
                dirtyFields.twitter && `bg-primary-50`
              }`}
            >
              <input
                id="twitter-input"
                type="text"
                className="input-text"
                placeholder="@johndoe"
                aria-invalid={errors.twitter ? "true" : "false"}
                {...register("twitter")}
              />
            </div>
            {errors.twitter && (
              <p role="alert" className="input-error">
                {errors.twitter.message}
              </p>
            )}
            <label
              htmlFor="discord-input"
              className="text-body5 mt-16 font-medium inline-block"
            >
              Discord username
            </label>
            <div
              className={`input-wrapper mt-8 relative ${
                dirtyFields.discord && `bg-primary-50`
              }`}
            >
              <input
                id="discord-input"
                type="text"
                className="input-text"
                placeholder="Satoshi#2121"
                aria-invalid={errors.discord ? "true" : "false"}
                {...register("discord")}
              />
            </div>
            {errors.discord && (
              <p role="alert" className="input-error">
                {errors.discord.message}
              </p>
            )}
            <label
              htmlFor="github-input"
              className="text-body5 mt-16 font-medium inline-block"
            >
              Github username
            </label>
            <div
              className={`input-wrapper mt-8 relative ${
                dirtyFields.github && `bg-primary-50`
              }`}
            >
              <input
                id="github-input"
                type="text"
                className="input-text"
                placeholder="johndoe"
                aria-invalid={errors.github ? "true" : "false"}
                {...register("github")}
              />
            </div>
            {errors.github && (
              <p role="alert" className="input-error">
                {errors.github.message}
              </p>
            )}
            <label
              htmlFor="linkedin-input"
              className="text-body5 mt-16 font-medium inline-block"
            >
              Linkedin
            </label>
            <div
              className={`input-wrapper mt-8 relative ${
                dirtyFields.linkedin && `bg-primary-50`
              }`}
            >
              <input
                id="linkedin-input"
                type="text"
                className="input-text"
                placeholder="www.linkedin.com/in/john-doe"
                aria-invalid={errors.linkedin ? "true" : "false"}
                {...register("linkedin")}
              />
            </div>
            {errors.linkedin && (
              <p role="alert" className="input-error">
                {errors.linkedin.message}
              </p>
            )}
            <label
              htmlFor="website-input"
              className="text-body5 mt-16 font-medium inline-block"
            >
              Your website
            </label>
            <div
              className={`input-wrapper mt-8 relative ${
                dirtyFields.website && `bg-primary-50`
              }`}
            >
              <input
                id="website-input"
                type="text"
                className="input-text"
                placeholder="www.website.io"
                aria-invalid={errors.website ? "true" : "false"}
                {...register("website")}
              />
            </div>
            {errors.website && (
              <p role="alert" className="input-error">
                {errors.website.message}
              </p>
            )}
            <label
              htmlFor="lnAddress-input"
              className="text-body5 mt-16 font-medium inline-block"
            >
              Lightning address
            </label>

            <div
              className={`input-wrapper mt-8 relative ${
                dirtyFields.lightning_address && `bg-primary-50`
              }`}
            >
              <input
                id="lnAddress-input"
                type="text"
                className="input-text"
                placeholder="johndoe@lnd.com"
                aria-invalid={errors.lightning_address ? "true" : "false"}
                {...register("lightning_address")}
              />
            </div>
            {errors.lightning_address && (
              <p role="alert" className="input-error">
                {errors.lightning_address.message}
              </p>
            )}
            <p className="text-body6 text-gray-400 mt-8 max-w-[70ch]">
              Your lightning address is used to send the votes you get on your
              posts, comments, apps...etc, directly to you.
            </p>
          </form>
        </div>
      </Card>
      <div className="self-start sticky-side-element">
        <SaveChangesCard
          isLoading={mutationStatus.loading}
          isDirty={isDirty}
          onSubmit={handleSubmit(onSubmit)}
          onCancel={() => reset()}
        />
      </div>
    </div>
  );
}
