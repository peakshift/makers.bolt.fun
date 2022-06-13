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



export default function QuestionForm() {


    const formMethods = useForm<IFormInputs>({
        resolver: yupResolver(schema) as Resolver<IFormInputs>,
        defaultValues: {
            title: '',
            tags: [],
            body: '',
            cover_image: []
        }
    });
    const { handleSubmit, control, register, formState: { errors }, } = formMethods;

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
                                autoFocus
                                type='text'
                                className="input-text"
                                placeholder='Your Question Title'
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
                            placeholder="Enter your tag and click enter. You can add multiple tags to your post"
                            classes={{ container: 'mt-8' }}
                        />
                        {errors.tags && <p className="input-error">
                            {errors.tags.message}
                        </p>}
                    </div>
                    <ContentEditor
                        placeholder="Write your question here..."
                        name="body"
                    />

                    {errors.body && <p className="input-error py-8 px-16">
                        {errors.body.message}
                    </p>}
                </div>
                <div className="flex gap-16 mt-32">
                    <Button type='submit' color="primary">
                        Publish
                    </Button>
                    <Button color="gray">
                        Save Draft
                    </Button>
                </div>
            </form>
        </FormProvider >
    )
}
