import { motion } from 'framer-motion'
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer'
import { IoClose } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import Button from 'src/Components/Button/Button';
import { Direction, replaceModal } from 'src/redux/features/modals.slice';
import BasicSelectInput from 'src/Components/Inputs/Selects/BasicSelectInput/BasicSelectInput';
import { GetTournamentByIdDocument, TournamentMakerHackingStatusEnum, useRegisterInTournamentMutation } from 'src/graphql';
import InfoCard from 'src/Components/InfoCard/InfoCard';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { NotificationsService } from "src/services/notifications.service";


interface Props extends ModalCard {
    tournamentId: number
}

const hackingStatusOptions = [
    {
        label: "Hacking han solo 👻",
        value: TournamentMakerHackingStatusEnum.Solo
    }, {
        label: "Open to connect 👋",
        value: TournamentMakerHackingStatusEnum.OpenToConnect
    },
]

interface IFormInputs {
    email: string;
    agreement: boolean;
    hacking_status: typeof hackingStatusOptions[number];
}


const schema: yup.SchemaOf<IFormInputs> = yup.object({
    email: yup.string().required().email(),
    hacking_status: yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required()
    }).required(),
    agreement: yup.boolean().required().isTrue("You won't be able to follow the updates/events of the tournament if you don't allow this"),
}).required();

export default function RegistrationDetails({ onClose, direction, ...props }: Props) {


    const me = useAppSelector(state => state.user.me)
    const dispatch = useAppDispatch();

    const [mutate, mutationStatus] = useRegisterInTournamentMutation()


    const { handleSubmit, control, register, formState: { errors }, } = useForm<IFormInputs>({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
            hacking_status: hackingStatusOptions[0]
        }

    });


    if (!me)
        return null;


    const onCancel = () => onClose?.();

    const onSubmit: SubmitHandler<IFormInputs> = data => {
        mutate({
            variables: {
                data: {
                    email: data.email,
                    hacking_status: data.hacking_status.value,
                },
                tournamentId: Number(props.tournamentId)
            },
            onCompleted: (data) => {
                if (data.registerInTournament?.in_tournament) {
                    dispatch(replaceModal({
                        Modal: "RegisterTournamet_RegistrationSuccess",
                        direction: Direction.NEXT,
                        props: {
                            tournamentId: Number(props.tournamentId)
                        }
                    }))

                }
            },
            refetchQueries: [{
                query: GetTournamentByIdDocument,
                variables: {
                    id: props.tournamentId
                }
            }]
        })
            .catch(() => {
                NotificationsService.error("A network error happned...")
                mutationStatus.reset()
            })
    }


    return (
        <motion.div
            custom={direction}
            variants={modalCardVariants}
            initial='initial'
            animate="animate"
            exit='exit'
            className="modal-card max-w-[442px] rounded-xl relative "
        >
            <div className="p-24">
                <IoClose className='absolute text-body2 top-24 right-24 hover:cursor-pointer' onClick={onClose} />
                <h2 className='text-h5 font-bold text-center'>Register for tournament</h2>
            </div>
            <hr className="bg-gray-200" />
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-24 p-24'>
                <p className="text-body4 text-gray-600">Please provide us with some additional details below.</p>

                <div className='flex flex-col gap-8'>
                    <label className="text-body5 text-gray-600 font-medium">Hacking status</label>
                    <Controller
                        name="hacking_status"
                        control={control}
                        render={({ field: { value, onChange } }) => <BasicSelectInput
                            isMulti={false}
                            labelField='label'
                            valueField='value'
                            placeholder='Your hacking status'
                            value={value}
                            onChange={onChange}
                            options={hackingStatusOptions}
                        />}
                    />

                    <InfoCard >
                        <span className="font-bold">👋 Details:</span> other makers will be able to see your hacker card and send you Team Up requests.
                    </InfoCard>
                </div>
                <div className='flex flex-col gap-8'>
                    <label className="text-body5 text-gray-600 font-medium">Email address*</label>
                    <div className="input-wrapper relative">
                        <input
                            type='text'
                            className="input-text"
                            placeholder="johndoe@gmail.com"
                            {...register("email")}
                        />
                    </div>

                    {errors.email && <p className="input-error">
                        {errors.email.message}
                    </p>}
                    <div className="mt-12 flex gap-12">
                        <input
                            className='input-checkbox self-center cursor-pointer'
                            type="checkbox"
                            {...register('agreement', {})} />
                        <label className="text-body5 text-gray-600" >
                            Send me news and updates about the tournament.
                            <br />
                            No spam!
                        </label>
                    </div>
                    {errors.agreement && <p className="input-error">
                        {errors.agreement.message}
                    </p>}
                </div>

                <div className="grid grid-cols-2 gap-16">
                    <Button color='gray' onClick={onCancel}>Cancel</Button>
                    <Button type='submit' color='primary'>Continue</Button>
                </div>
            </form>
        </motion.div>
    )
}



