import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useUpdateProfileAboutMutation, useMyProfileAboutQuery, UpdateProfileAboutMutationVariables } from "src/graphql";
import { NotificationsService } from "src/services/notifications.service";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, usePrompt } from "src/utils/hooks";
import SaveChangesCard from "../SaveChangesCard/SaveChangesCard";
import { toast } from "react-toastify";
import Card from "src/Components/Card/Card";
import NotFoundPage from "src/features/Shared/pages/NotFoundPage/NotFoundPage";
import { setUser } from "src/redux/features/user.slice";
import UpdateProfileAboutTabSkeleton from "./UpdateMyProfileTab.Skeleton";
import AvatarInput from "src/Components/Inputs/FilesInputs/AvatarInput/AvatarInput";
import { imageSchema } from "src/utils/validation";

interface Props {
}

type IFormInputs = NonNullable<UpdateProfileAboutMutationVariables['data']>;


const schema: yup.SchemaOf<IFormInputs> = yup.object({
    name: yup.string().trim().required().min(2),
    avatar: imageSchema.required(),
    bio: yup.string().ensure(),
    email: yup.string().email().ensure(),
    github: yup.string().ensure(),
    jobTitle: yup.string().ensure(),
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
        .ensure()
        .label("lightning address"),
    linkedin: yup.string().ensure(),
    location: yup.string().ensure(),
    twitter: yup.string().ensure(),
    website: yup.string().url().ensure(),

}).required();

export default function UpdateMyProfileTab() {

    const { register, formState: { errors, isDirty, }, handleSubmit, reset, control } = useForm<IFormInputs>({
        defaultValues: {

        },
        resolver: yupResolver(schema),
        mode: 'onBlur',
    });


    const profileQuery = useMyProfileAboutQuery({
        onCompleted: data => {
            if (data.me)
                reset({ ...data.me, avatar: { url: data.me.avatar } })
        }
    })
    const [mutate, mutationStatus] = useUpdateProfileAboutMutation();

    const dispatch = useAppDispatch()
    usePrompt('You may have some unsaved changes. You still want to leave?', isDirty)



    if (profileQuery.loading)
        return <UpdateProfileAboutTabSkeleton />

    if (!profileQuery.data?.me)
        return <NotFoundPage />


    const onSubmit: SubmitHandler<IFormInputs> = data => {

        const toastId = toast.loading("Saving changes...", NotificationsService.defaultOptions)

        mutate({
            variables: {
                data: {
                    name: data.name,
                    avatar: data.avatar,
                    jobTitle: data.jobTitle,
                    bio: data.bio,
                    email: data.email,
                    github: data.github,
                    linkedin: data.linkedin,
                    lightning_address: data.lightning_address,
                    location: data.location,
                    twitter: data.twitter,
                    website: data.website,
                }
            },
            onCompleted: ({ updateProfileDetails: data }) => {
                if (data) {
                    dispatch(setUser(data))
                    reset({ ...data, avatar: { url: data.avatar } });
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
                        <p className="text-body5 font-medium">
                            Name
                        </p>
                        <div className="input-wrapper mt-8 relative">
                            <input
                                autoFocus
                                type='text'
                                className="input-text"
                                placeholder='John Doe'
                                {...register("name")}
                            />
                        </div>
                        {errors.name && <p className="input-error">
                            {errors.name.message}
                        </p>}
                        <p className="text-body5 mt-16 font-medium">
                            Bio
                        </p>
                        <div className="input-wrapper mt-8 relative">
                            <textarea

                                rows={4}
                                className="input-text"
                                placeholder='Tell others a little bit about yourself'
                                {...register("bio")}
                            />
                        </div>
                        {errors.bio && <p className="input-error">
                            {errors.bio.message}
                        </p>}
                        <p className="text-body5 mt-16 font-medium">
                            Job Title
                        </p>
                        <div className="input-wrapper mt-8 relative">
                            <input

                                type='text'
                                className="input-text"
                                placeholder="Back-end Developer"
                                {...register("jobTitle")}
                            />
                        </div>
                        {errors.jobTitle && <p className="input-error">
                            {errors.jobTitle.message}
                        </p>}
                        <p className="text-body5 mt-16 font-medium">
                            Location
                        </p>
                        <div className="input-wrapper mt-8 relative">
                            <input

                                type='text'
                                className="input-text"
                                placeholder="UK, London"
                                {...register("location")}
                            />
                        </div>
                        {errors.location && <p className="input-error">
                            {errors.location.message}
                        </p>}
                        <p className="text-body5 mt-16 font-medium">
                            Website
                        </p>
                        <div className="input-wrapper mt-8 relative">
                            <input

                                type='text'
                                className="input-text"
                                placeholder="www.website.io"
                                {...register("website")}
                            />
                        </div>
                        {errors.website && <p className="input-error">
                            {errors.website.message}
                        </p>}
                        <p className="text-body5 mt-16 font-medium">
                            Twitter
                        </p>
                        <div className="input-wrapper mt-8 relative">
                            <input

                                type='text'
                                className="input-text"
                                placeholder="@johndoe"
                                {...register("twitter")}
                            />
                        </div>
                        {errors.twitter && <p className="input-error">
                            {errors.twitter.message}
                        </p>}
                        <p className="text-body5 mt-16 font-medium">
                            Github
                        </p>
                        <div className="input-wrapper mt-8 relative">
                            <input

                                type='text'
                                className="input-text"
                                placeholder="johndoe"
                                {...register("github")}
                            />
                        </div>
                        {errors.github && <p className="input-error">
                            {errors.github.message}
                        </p>}
                        <p className="text-body5 mt-16 font-medium">
                            Linkedin
                        </p>
                        <div className="input-wrapper mt-8 relative">
                            <input

                                type='text'
                                className="input-text"
                                placeholder="www.linkedin.com/in/john-doe"
                                {...register("linkedin")}
                            />
                        </div>
                        {errors.linkedin && <p className="input-error">
                            {errors.linkedin.message}
                        </p>}
                        <p className="text-body5 mt-16 font-medium">
                            Lightning address
                        </p>

                        <div className="input-wrapper mt-8 relative">
                            <input

                                type='text'
                                className="input-text"
                                placeholder="johndoe@lnd.com"
                                {...register("lightning_address")}
                            />
                        </div>
                        {errors.lightning_address && <p className="input-error">
                            {errors.lightning_address.message}
                        </p>}
                        <p className="text-body6 text-gray-400 mt-8 max-w-[70ch]">
                            Your lightning address is used to send the votes you get on your posts, comments, apps...etc, directly to you.
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
    )
}
