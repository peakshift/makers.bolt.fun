import { Controller, useFormContext } from "react-hook-form"
import Card from "src/Components/Card/Card";
import TournamentsInput from "../TournamentsInput/TournamentsInput";
import { IListProjectForm } from "../FormContainer/FormContainer";

interface Props { }

export default function ExtrasTab(props: Props) {

    const { register, formState: { errors, isDirty, }, control } = useFormContext<IListProjectForm>();



    // usePrompt('You may have some unsaved changes. You still want to leave?', isDirty)


    return (
        <div className="flex flex-col gap-24">
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
    )
}
