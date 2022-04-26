import { motion } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
import Button from 'src/Components/Button/Button'
import DatePicker from 'src/Components/Inputs/DatePicker/DatePicker'
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer'
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema: yup.SchemaOf<IFormInputs> = yup.object({
    workplan: yup.string().required().min(10),
    firstDraft: yup.date().required(),
    completionDate: yup.date().required(),
    agreement1: yup.boolean().required().isTrue(),
    agreement2: yup.boolean().required().isTrue(),
}).required();

interface IFormInputs {
    workplan: string
    firstDraft: Date
    completionDate: Date
    agreement1: boolean
    agreement2: boolean
}

export default function Login_SuccessCard({ onClose, direction, ...props }: ModalCard) {

    const { handleSubmit, control, register, formState: { isValid }, watch } = useForm<IFormInputs>({
        mode: "onChange",
        resolver: yupResolver(schema)

    });

    const onSubmit: SubmitHandler<IFormInputs> = data => console.log(data);

    return (
        <motion.div
            custom={direction}
            variants={modalCardVariants}
            initial='initial'
            animate="animate"
            exit='exit'
            className="modal-card max-w-[774px] p-32 rounded-xl relative !bg-white"

        >
            <IoClose className='absolute text-body2 top-32 right-32 hover:cursor-pointer' onClick={onClose} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className='text-h5 font-bolder'>Submit a plan</h2>
                <p className="text-body4 mt-8">
                    Please provide an action plan & ask any initial questions you have for this ticket
                </p>
                <div className="input-wrapper mt-24 relative">
                    <textarea
                        rows={6}
                        className="input-text !p-20"
                        placeholder='What steps will you take to complete this task? '
                        {...register("workplan", { required: true, minLength: 20 })}
                    />
                </div>
                <div className="grid sm:grid-cols-2 gap-24 mt-16">
                    <div>
                        <label className='text-body5 text-gray-600 font-medium' htmlFor="">First Draft</label>
                        <Controller
                            name="firstDraft"
                            control={control}
                            render={({ field }) => <DatePicker {...field} className='mt-8' />}
                        />

                    </div>
                    <div>
                        <label className='text-body5 text-gray-600 font-medium' htmlFor="">Completion Date</label>
                        <Controller
                            name="completionDate"
                            control={control}
                            render={({ field }) => <DatePicker {...field} className='mt-8' />}
                        />
                    </div>
                </div>

                <div>
                    <div className="mt-16 flex gap-16">
                        <input
                            className='input-checkbox self-center'
                            type="checkbox"
                            {...register('agreement1')} />
                        <label className="text-body4 text-gray-600" >
                            I understand that this is an application and I should wait for approval from the funder before working
                        </label>
                    </div>
                    <div className="mt-16 flex gap-16">
                        <input
                            className='input-checkbox self-center'
                            type="checkbox"
                            {...register('agreement2', {})} />
                        <label className="text-body4 text-gray-600" >
                            I agree to keep the funder informed of my progress every few days
                        </label>
                    </div>
                </div>

                <Button
                    type='submit'
                    fullWidth
                    color='black'
                    className='mt-24'
                    disabled={!isValid}
                >
                    Submit
                </Button>
                {!isValid &&
                    <p className="text-body6 text-gray-600 mt-4 font-medium" >
                        Please fill all the required fields in order to submit
                    </p>}

            </form>

        </motion.div>
    )
}
