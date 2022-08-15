import { Controller, NestedValue, Resolver, SubmitHandler, useForm } from "react-hook-form"
import Button from "src/Components/Button/Button";
import { Project, User, useUpdateProfileAboutMutation } from "src/graphql";
import { NotificationsService } from "src/services/notifications.service";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { usePrompt } from "src/utils/hooks";
import { toast } from "react-toastify";
import Card from "src/Components/Card/Card";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { FiCamera, FiGithub, FiTwitter } from "react-icons/fi";
import CategoriesInput from "../CategoriesInput/CategoriesInput";
import CapabilitiesInput from "../CapabilitiesInput/CapabilitiesInput";


interface IProjectDetails {
    name: string
    website: string
    tagline: string
    description: string
    thumbnail_image: string
    cover_image: string

    twitter: string
    discord: string
    github: string

    category_id: number

    capabilities: NestedValue<string[]>

    screenshots: NestedValue<string[]>

}

interface Props {
    data?: IProjectDetails,
    onClose?: () => void;
}

// type IFormInputs = Props['data'];

const schema: yup.SchemaOf<IProjectDetails> = yup.object({
    name: yup.string().trim().required().min(2),
    website: yup.string().trim().url().required(),
    tagline: yup.string().trim().required().min(10),
    description: yup.string().trim().required().min(50, 'Write at least 10 words descriping your project'),
    thumbnail_image: yup.string().url().required(),
    cover_image: yup.string().url().required(),

    twitter: yup.string().ensure(),
    discord: yup.string().ensure(),
    github: yup.string().ensure(),

    category_id: yup.number().required(),

    capabilities: yup.array().of(yup.string().required()),

    screenshots: yup.array().of(yup.string().required()),
}).required();

export default function ProjectDetailsTab({ data, onClose }: Props) {

    const { register, formState: { errors, isDirty, }, handleSubmit, reset, control } = useForm<IProjectDetails>({
        defaultValues: {
            ...data,
            capabilities: data?.capabilities ?? []
        },
        resolver: yupResolver(schema) as Resolver<IProjectDetails>,
        // mode: 'onBlur',
    });

    const [mutate, mutationStatus] = useUpdateProfileAboutMutation();



    usePrompt('You may have some unsaved changes. You still want to leave?', isDirty)


    const onSubmit: SubmitHandler<IProjectDetails> = data => {

        const toastId = toast.loading("Saving changes...", NotificationsService.defaultOptions)

        mutate({
            // variables: {
            //     data: {
            //         // name: data.name,
            //         // avatar: data.avatar,
            //         // jobTitle: data.jobTitle,
            //         // bio: data.bio,
            //         // email: data.email,
            //         // github: data.github,
            //         // linkedin: data.linkedin,
            //         // lightning_address: data.lightning_address,
            //         // location: data.location,
            //         // twitter: data.twitter,
            //         // website: data.website,
            //     }
            // },
            onCompleted: () => {
                reset(data);
                toast.update(toastId, { render: "Saved changes successfully", type: "success", ...NotificationsService.defaultOptions, isLoading: false });
            }
        })
            .catch(() => {
                toast.update(toastId, { render: "A network error happened", type: "error", ...NotificationsService.defaultOptions, isLoading: false });
                mutationStatus.reset()
            })
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            <div className="md:col-span-2 flex flex-col gap-24">
                <Card className="" defaultPadding={false}>
                    <div className="bg-gray-600 relative h-[160px] rounded-t-16">
                        <div className="absolute left-24 bottom-0 translate-y-1/2">
                            {/* <Avatar src={data.avatar} width={120} /> */}
                            <div
                                className="rounded-full w-[120px] aspect-square border-2 border-gray-200 bg-white flex flex-col gap-8 items-center justify-center"
                                role={'button'}
                            >
                                <FiCamera className="text-gray-400 text-h2" />
                                <span className="text-gray-400 text-body6">Add image</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-16 md:p-24 mt-64">
                        <p className="text-body5 font-medium">
                            Project name<sup className="text-red-500">*</sup>
                        </p>
                        <div className="input-wrapper mt-8 relative">
                            <input
                                autoFocus
                                type='text'
                                className="input-text"
                                placeholder='e.g BOLT🔩FUN'
                                {...register("name")}
                            />
                        </div>
                        {errors.name && <p className="input-error">
                            {errors.name.message}
                        </p>}
                        <p className="text-body5 mt-16 font-medium">
                            Project link<sup className="text-red-500">*</sup>
                        </p>
                        <div className="input-wrapper mt-8 relative">
                            <input

                                type='text'
                                className="input-text"
                                placeholder='https://lightning.xyz'
                                {...register("website")}
                            />
                        </div>
                        {errors.website && <p className="input-error">
                            {errors.website.message}
                        </p>}
                        <p className="text-body5 mt-16 font-medium">
                            Tagline<sup className="text-red-500">*</sup>
                        </p>
                        <div className="input-wrapper mt-8 relative">
                            <input

                                type='text'
                                className="input-text"
                                placeholder='Your product’s one liner goes here...'
                                {...register("tagline")}
                            />
                        </div>
                        {errors.tagline && <p className="input-error">
                            {errors.tagline.message}
                        </p>}
                        <p className="text-body5 mt-16 font-medium">
                            Description<sup className="text-red-500">*</sup>
                        </p>
                        <div className="input-wrapper mt-8 relative">
                            <textarea

                                rows={3}
                                className="input-text !p-20"
                                placeholder='Provide a short description your product...'
                                {...register("description")}
                            />
                        </div>
                        {errors.description && <p className="input-error">
                            {errors.description.message}
                        </p>}

                    </div>
                </Card>
                <Card className="">
                    <h2 className="text-body2 font-bolder">🔗  Links</h2>
                    <p className="text-body4 font-light text-gray-600 mt-8">Make sure that people can find your project online. </p>
                    <div className="flex flex-col gap-8 mt-24">

                        <div>
                            <div className="input-wrapper mt-8 relative">
                                <FiTwitter className="text-blue-400 h-full flex-shrink-0 w-42 pl-12 py-12 self-center" />
                                <input
                                    type='text'
                                    className="input-text"
                                    placeholder='https://twitter.com/'
                                    {...register("twitter")}
                                />
                            </div>
                            {errors.twitter && <p className="input-error">
                                {errors.twitter.message}
                            </p>}
                        </div>

                        <div>
                            <div className="input-wrapper mt-8 relative">
                                <FaDiscord className="text-violet-500 h-full flex-shrink-0 w-42 pl-12 py-12 self-center" />
                                <input
                                    type='text'
                                    className="input-text"
                                    placeholder='https://discord.com/'
                                    {...register("discord")}
                                />
                            </div>
                            {errors.discord && <p className="input-error">
                                {errors.discord.message}
                            </p>}
                        </div>

                        <div>
                            <div className="input-wrapper mt-8 relative">
                                <FiGithub className="text-gray-700 h-full flex-shrink-0 w-42 pl-12 py-12 self-center" />
                                <input
                                    type='text'
                                    className="input-text"
                                    placeholder='https://github.com/'
                                    {...register("github")}
                                />
                            </div>
                            {errors.github && <p className="input-error">
                                {errors.github.message}
                            </p>}
                        </div>
                    </div>
                </Card>

                <Card>
                    <h2 className="text-body2 font-bolder">🌶️ Category</h2>
                    <p className="text-body4 font-light text-gray-600 mt-8">Select one of the categories below.</p>
                    <div className="mt-24">
                        <Controller
                            control={control}
                            name="category_id"
                            render={({ field: { onChange, value } }) => (
                                <CategoriesInput
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                        {errors.category_id && <p className='input-error'>{errors.category_id?.message}</p>}
                    </div>
                </Card>

                <Card>
                    <h2 className="text-body2 font-bolder">🦾  Capabilities</h2>
                    <p className="text-body4 font-light text-gray-600 mt-8">Let other makers know what lightning capabilities your applicaiton has.</p>
                    <div className="mt-24">
                        <Controller
                            control={control}
                            name="capabilities"
                            render={({ field: { onChange, value } }) => (
                                <CapabilitiesInput
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                        {errors.capabilities && <p className='input-error'>{errors.capabilities?.message}</p>}
                    </div>
                </Card>
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
    )
}
