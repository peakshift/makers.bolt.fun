import { Controller, useFormContext } from "react-hook-form"
import Card from "src/Components/Card/Card";
import TeamMembersInput from "../TeamMembersInput/TeamMembersInput";
import RecruitRolesInput from "../RecruitRolesInput/RecruitRolesInput";
import { IListProjectForm } from "../FormContainer/FormContainer";


interface Props {
}

export default function TeamTab(props: Props) {

    const { formState: { errors, }, control } = useFormContext<IListProjectForm>();



    return (
        <div className="flex flex-col gap-24">


            <Card >
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
    )
}
