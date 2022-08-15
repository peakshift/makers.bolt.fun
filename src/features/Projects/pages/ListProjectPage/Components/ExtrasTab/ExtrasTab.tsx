import { Controller, NestedValue, Resolver, SubmitHandler, useForm } from "react-hook-form"
import { NotificationsService } from "src/services/notifications.service";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePrompt } from "src/utils/hooks";
import { toast } from "react-toastify";
import Card from "src/Components/Card/Card";
import TeamMembersInput from "../TeamMembersInput/TeamMembersInput";
import { Team_Member_Role } from "src/graphql";
import RecruitRolesInput from "../RecruitRolesInput/RecruitRolesInput";
import TournamentsInput from "../TournamentsInput/TournamentsInput";


export interface IExtrasForm {
    launch_status: "wip" | "launched"
    tournaments: NestedValue<string[]>
}

interface Props {
    data?: IExtrasForm,
}

// type IFormInputs = Props['data'];

const schema: yup.SchemaOf<IExtrasForm> = yup.object({
    launch_status: yup.mixed().oneOf(['wip', 'launched']).required(),
    tournaments: yup.array().required().default([])
}).required();

export default function ExtrasTab({ data }: Props) {

    const { register, formState: { errors, isDirty, }, handleSubmit, reset, control } = useForm<IExtrasForm>({
        defaultValues: {
            ...data,
            launch_status: 'wip',
            tournaments: []
        },
        resolver: yupResolver(schema) as Resolver<IExtrasForm>,
        // mode: 'onBlur',
    });



    usePrompt('You may have some unsaved changes. You still want to leave?', isDirty)


    const onSubmit: SubmitHandler<IExtrasForm> = data => {

        const toastId = toast.loading("Saving changes...", NotificationsService.defaultOptions)
        const mutate: any = null;
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
                // mutationStatus.reset()
            })
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            <div className="md:col-span-2 flex flex-col gap-24">


                <Card>
                    <h2 className="text-body2 font-bolder">🚀  Launch status</h2>
                    <p className="text-body4 font-light text-gray-600 mt-8">Has this product been launched already, or is it still a work in progress?</p>
                    <div className="mt-24 flex flex-col gap-24">
                        <div className="flex gap-16">
                            <input
                                {...register("launch_status")}
                                type="radio"
                                name="launch_status"
                                value='wip'
                            />
                            <div>
                                <p className="text-body4 font-medium">WIP 🛠️</p>
                                <p className="text-body5 text-gray-500 mt-4">It’s still a Work In Progress.</p>
                            </div>
                        </div>
                        <div className="flex gap-16">
                            <input
                                {...register("launch_status")}
                                type="radio"
                                name="launch_status"
                                value='launched'
                            />
                            <div>
                                <p className="text-body4 font-medium">Launched 🚀</p>
                                <p className="text-body5 text-gray-500 mt-4">The product is ready for launch, or has been launched already.</p>
                            </div>
                        </div>
                        {errors.launch_status && <p className='input-error'>{errors.launch_status?.message}</p>}
                    </div>
                </Card>

                <Card>
                    <h2 className="text-body2 font-bolder">⚔️️  Tournaments</h2>
                    <p className="text-body4 font-light text-gray-600 mt-8">Is your application part of a tournament? If so, select the tournament(s) that apply and it will automatically be listed for you.</p>
                    <div className="mt-24">
                        <Controller
                            control={control}
                            name="tournaments"
                            render={({ field: { onChange, value } }) => (
                                <TournamentsInput
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                        {errors.tournaments && <p className='input-error'>{errors.tournaments?.message}</p>}
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
