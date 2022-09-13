import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FormProvider, NestedValue, Resolver, SubmitHandler, useForm } from "react-hook-form";
import Button from "src/Components/Button/Button";
import DatePicker from "src/Components/Inputs/DatePicker/DatePicker";
import TagsInput from "src/Components/Inputs/TagsInput/TagsInput";
import { Tag } from "src/graphql";
import { imageSchema } from "src/utils/validation";
import * as yup from "yup";
import ContentEditor from "../ContentEditor/ContentEditor";


const schema = yup.object({
    title: yup
        .string()
        .required()
        .min(10),
    tags: yup
        .array()
        .required()
        .min(1),
    deadline: yup
        .date()
        .typeError('Deadline must be a valid date')
        .required(),
    bounty_amount: yup
        .number()
        .typeError('Bounty amount must be a valid number')
        .required()
        .min(100)
        .label("Bounty Amount"),
    body: yup
        .string()
        .required()
        .min(50, 'you have to write at least 10 words'),
    cover_image: imageSchema,
}).required();

interface IFormInputs {
    title: string
    deadline: Date
    bounty_amount: number
    tags: NestedValue<Tag[]>
    cover_image: NestedValue<File[]> | string
    body: string
}



export default function BountyForm() {


    const formMethods = useForm<IFormInputs>({
        resolver: yupResolver(schema) as Resolver<IFormInputs>,
        defaultValues: {
            title: '',
            tags: [],
            bounty_amount: 1000,
            deadline: new Date(),
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
                        {/* <Controller
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
                        /> */}
                        <p className='input-error'>{errors.cover_image?.message}</p>


                        <p className="text-body5 mt-16">
                            Title
                        </p>
                        <div className="input-wrapper mt-8 relative">
                            <input
                                autoFocus
                                type='text'
                                className="input-text"
                                placeholder='Your Bounty Title'
                                {...register("title")}
                            />
                        </div>
                        {errors.title && <p className="input-error">
                            {errors.title.message}
                        </p>}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mt-16">
                            <div>
                                <p className="text-body5">
                                    Bounty Amount
                                </p>
                                <div className="input-wrapper mt-8">
                                    <input
                                        type="number"
                                        className='input-text input-removed-arrows'
                                        placeholder="10,000"
                                        min={0}
                                        step={100}
                                        {...register("bounty_amount")}
                                    />
                                    <p className='px-16 shrink-0 self-center text-primary-400'>
                                        Sats
                                    </p>
                                </div>
                                <p className='input-error'>{errors.bounty_amount?.message}</p>
                            </div>
                            <div>
                                <p className="text-body5">
                                    Deadline
                                </p>
                                <Controller
                                    name="deadline"
                                    control={control}
                                    render={({ field }) => <DatePicker {...field} className='mt-8' />}
                                />
                                <p className='input-error'>{errors.deadline?.message}</p>

                            </div>
                        </div>


                        <p className="text-body5 mt-16">
                            Tags
                        </p>
                        <Controller
                            control={control}
                            name="tags"
                            render={({ field: { onChange, value, onBlur } }) => (
                                <TagsInput
                                    placeholder="Add up to 5 popular tags..."
                                    classes={{ container: 'mt-16' }}
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />
                            )}
                        />

                        {errors.tags && <p className="input-error">
                            {errors.tags.message}
                        </p>}
                    </div>
                    <ContentEditor
                        placeholder="Write a detailed description for your bounty here..."
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
