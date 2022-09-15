import { Controller, useFormContext } from "react-hook-form"
import Card from "src/Components/Card/Card";
import { FaDiscord } from "react-icons/fa";
import { FiCamera, FiGithub, FiTwitter } from "react-icons/fi";
import CategoriesInput from "../CategoriesInput/CategoriesInput";
import CapabilitiesInput from "../CapabilitiesInput/CapabilitiesInput";
import { IListProjectForm } from "../FormContainer/FormContainer";
import AvatarInput from "src/Components/Inputs/FilesInputs/AvatarInput/AvatarInput";
import CoverImageInput from "src/Components/Inputs/FilesInputs/CoverImageInput/CoverImageInput";
import ScreenshotsInput from "src/Components/Inputs/FilesInputs/ScreenshotsInput/ScreenshotsInput";

interface Props { }

export default function ProjectDetailsTab(props: Props) {

    const { register, formState: { errors, }, control, getValues } = useFormContext<IListProjectForm>();


    // usePrompt('You may have some unsaved changes. You still want to leave?', isDirty)



    return (
        <div className="md:col-span-2 flex flex-col gap-24">
            <Card className="" defaultPadding={false}>
                <div className="bg-gray-600 relative h-[160px] rounded-t-12 md:rounded-t-16">
                    <Controller
                        control={control}
                        name="cover_image"
                        render={({ field: { onChange, value, onBlur, ref } }) => <CoverImageInput
                            value={value}
                            rounded='rounded-t-12 md:rounded-t-16'
                            onChange={e => {
                                onChange(e)
                            }}
                        // uploadText='Add a cover image'
                        />

                        }
                    />
                    <div className="absolute left-24 bottom-0 translate-y-1/2">
                        <Controller
                            control={control}
                            name="thumbnail_image"
                            render={({ field: { onChange, value } }) => (
                                <AvatarInput value={value} onChange={onChange} width={120} />
                            )}
                        />
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
                            {...register("title")}
                        />
                    </div>
                    {errors.title && <p className="input-error">
                        {errors.title.message}
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
                            maxLength={32}
                            type='text'
                            className="input-text"
                            placeholder='Your product’s one liner'
                            {...register("tagline")}
                        />
                        <span className="h-full shrink-0 px-12 text-gray-400 text-body6 font-medium self-center">{getValues('tagline').length} / 32</span>
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
                            className="input-text !px-16 !py-12"
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
                            <FiTwitter className="text-blue-400 text-body2 pl-16 py-0 w-auto shrink-0 self-center" />
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
                            <FaDiscord className="text-violet-500 text-body2 pl-16 py-0 w-auto shrink-0 self-center" />
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
                            <FiGithub className="text-gray-700 text-body2 pl-16 py-0 w-auto shrink-0 self-center" />
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
                <h2 className="text-body2 font-bolder">🌶️ Category<sup className="text-red-500">*</sup></h2>
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

            <Card>
                <h2 className="text-body2 font-bolder">📷  Screenshots</h2>
                <p className="text-body4 font-light text-gray-600 mt-8">Choose up to 4 images from your project</p>
                <div className="mt-24">
                    <Controller
                        control={control}
                        name="screenshots"
                        render={({ field: { onChange, value, onBlur, ref } }) => <ScreenshotsInput
                            value={value}
                            onChange={e => {
                                onChange(e)
                            }}
                        />

                        }
                    />
                    {errors.capabilities && <p className='input-error'>{errors.capabilities?.message}</p>}
                </div>
            </Card>
        </div>
    )
}
