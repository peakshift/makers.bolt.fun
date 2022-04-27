import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FormProvider, NestedValue, Resolver, SubmitHandler, useForm } from "react-hook-form";
import Button from "src/Components/Button/Button";
import FilesInput from "src/Components/Inputs/FilesInput/FilesInput";
import TagsInput from "src/Components/Inputs/TagsInput/TagsInput";
import * as yup from "yup";
import ContentEditor from "../ContentEditor/ContentEditor";


const schema = yup.object({
    title: yup.string().required().min(10),
    tags: yup.array().required().min(1),
    body: yup.string().required().min(50, 'you have to write at least 10 words'),
    cover_image: yup.lazy((value: string | File[]) => {
        switch (typeof value) {
            case 'object':
                return yup.array()
                    .test("fileSize", "File Size is too large", (files) => (files as File[]).every(file => file.size <= 5242880))
                    .test("fileType", "Unsupported File Format, only png/jpg/jpeg images are allowed",
                        (files) => (files as File[]).every((file: File) =>
                            ["image/jpeg", "image/png", "image/jpg"].includes(file.type)))
            case 'string':
                return yup.string().url();
            default:
                return yup.mixed()
        }
    })
}).required();

interface IFormInputs {
    title: string
    tags: NestedValue<object[]>
    cover_image: NestedValue<File[]> | string
    body: string
}



export default function StoryForm() {


    const formMethods = useForm<IFormInputs>({
        resolver: yupResolver(schema) as Resolver<IFormInputs>,
        defaultValues: {
            title: '',
            tags: [{
                title: 'tag 1'
            }],
            body: '',
            cover_image: 'https://i.picsum.photos/id/10/1600/900.jpg?hmac=9R7fIkKwC5JxHx8ayZAKNMt6FvJXqKKyiv8MClikgDo'
        }

    });
    const { handleSubmit, control, register, formState: { errors }, watch, } = formMethods;

    const onSubmit: SubmitHandler<IFormInputs> = data => console.log(data);

    return (
        <FormProvider {...formMethods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <div
                    className='bg-white shadow-lg rounded-8 overflow-hidden'>
                    <div className="p-32">


                        <Controller
                            control={control}
                            name="cover_image"
                            render={({ field: { onChange, value, onBlur } }) => (
                                <FilesInput
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    uploadText='Add a cover image'
                                />
                            )}
                        />
                        <p className='input-error'>{errors.cover_image?.message}</p>


                        <p className="text-body5 mt-16">
                            Title
                        </p>
                        <div className="input-wrapper mt-8 relative">
                            <input
                                type='text'
                                className="input-text"
                                placeholder='Your Story Title'
                                {...register("title")}
                            />
                        </div>
                        {errors.title && <p className="input-error">
                            {errors.title.message}
                        </p>}


                        <p className="text-body5 mt-16">
                            Tags
                        </p>
                        <TagsInput
                            placeholder="webln, alby, lnurl, wallet, ..."
                            classes={{ container: 'mt-8' }}
                        />
                        {errors.tags && <p className="input-error">
                            {errors.tags.message}
                        </p>}
                    </div>
                    <ContentEditor
                        placeholder="Write your story content here..."
                        name="body"
                    />

                    {errors.body && <p className="input-error py-8 px-16">
                        {errors.body.message}
                    </p>}
                </div>
                <div className="flex gap-16 mt-32">
                    <Button type='submit' color="primary">
                        Preview & Publish
                    </Button>
                    <Button color="gray">
                        Save Draft
                    </Button>
                </div>
            </form>
        </FormProvider >
    )
}
