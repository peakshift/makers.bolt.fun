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


export interface ITeamForm {
    members: NestedValue<{
        id: number,
        name: string,
        jobTitle: string | null,
        avatar: string,
        role: Team_Member_Role,
    }[]>

    recruit_roles: NestedValue<string[]>
}

interface Props {
    data?: ITeamForm,
}

// type IFormInputs = Props['data'];

const schema: yup.SchemaOf<ITeamForm> = yup.object({
    members: yup.array().of(yup.object() as any).required().default([]),
    recruit_roles: yup.array().required().default([])
}).required();

export default function TeamTab({ data }: Props) {

    const { formState: { errors, isDirty, }, handleSubmit, reset, control } = useForm<ITeamForm>({
        defaultValues: {
            ...data,
            members: [],
            recruit_roles: [],
        },
        resolver: yupResolver(schema) as Resolver<ITeamForm>,
        // mode: 'onBlur',
    });



    usePrompt('You may have some unsaved changes. You still want to leave?', isDirty)


    const onSubmit: SubmitHandler<ITeamForm> = data => {

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
                    <h2 className="text-body2 font-bolder">⚡️  Team</h2>
                    <p className="text-body4 font-light text-gray-600 mt-8">Let us know who is on this product’s team.</p>
                    <div className="mt-24">
                        <Controller
                            control={control}
                            name="members"
                            render={({ field: { onChange, value } }) => (
                                <TeamMembersInput
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                        {errors.members && <p className='input-error'>{errors.members?.message}</p>}
                    </div>
                    <div className="bg-gray-50 p-16 rounded-12 border border-gray-200 mt-24">
                        <p className="text-body5">
                            <span className="font-bold">💡 Onboard your team:</span> Make sure you onboard any other team members so they can help you manage this project.
                        </p>
                    </div>
                </Card>

                <Card>
                    <h2 className="text-body2 font-bolder">💪️  Recruit</h2>
                    <p className="text-body4 font-light text-gray-600 mt-8">Are you looking to recruit more makers to your project? Select the roles you’re looking for below and let makers discover your project at ⚔️ Tournaments.</p>
                    <div className="mt-24">
                        <Controller
                            control={control}
                            name="recruit_roles"
                            render={({ field: { onChange, value } }) => (
                                <RecruitRolesInput
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                        {errors.recruit_roles && <p className='input-error'>{errors.recruit_roles?.message}</p>}
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
