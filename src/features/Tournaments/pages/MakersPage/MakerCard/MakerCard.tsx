import Button from "src/Components/Button/Button"
import { GetMakersInTournamentQuery, TournamentMakerHackingStatusEnum, useUpdateTournamentRegistrationMutation } from "src/graphql";
import { useAppDispatch, } from "src/utils/hooks";
import Card from 'src/Components/Card/Card';
import Avatar from 'src/features/Profiles/Components/Avatar/Avatar';
import Badge from 'src/Components/Badge/Badge';
import { createRoute } from 'src/utils/routing';
import { openModal } from "src/redux/features/modals.slice";
import InfoCard from "src/Components/InfoCard/InfoCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import { NotificationsService } from "src/services";

type MakerType = GetMakersInTournamentQuery['getMakersInTournament']['makers'][number]

interface Props {
    maker: MakerType,
    isMe?: boolean;
}

export default function MakerCard({ maker, isMe }: Props) {

    const dispatch = useAppDispatch();
    const [hackingStatus, setHackingStatus] = useState(maker.hacking_status)

    const contactLinksAvailable = maker.user.github || maker.user.linkedin || maker.user.twitter;
    const [udpateInfo, updateInfoMutation] = useUpdateTournamentRegistrationMutation()

    let actionBtn = <></>

    if (isMe)
        actionBtn = <Button fullWidth color='white' href={createRoute({ type: 'edit-profile' })} size='sm' className='ml-auto'>Edit Profile</Button>;
    else if (maker.hacking_status === TournamentMakerHackingStatusEnum.OpenToConnect && contactLinksAvailable)
        actionBtn = <Button fullWidth color='white' size='sm' className='ml-auto' onClick={() => dispatch(openModal({ Modal: "ConnectToMakerModal", props: { maker } }))}>🤝 Team Up</Button>
    else if (maker.hacking_status === TournamentMakerHackingStatusEnum.Solo)
        actionBtn = <Button fullWidth color='white' disabled size='sm' className='ml-auto'>Hacking solo</Button>


    const missingFields = isMe && getMissingFields(maker);

    const changeHacktingStatus = (value: typeof hackingStatus) => {
        setHackingStatus(value);
        udpateInfo({
            variables: {
                tournamentId: 12,
                data: {
                    hacking_status: value
                }
            },
        })
            .catch(() => {
                setHackingStatus(maker.hacking_status)
                NotificationsService.error("A network error happened")
            })
    }

    return (
        <Card>
            <div className="flex flex-wrap gap-24 items-start">
                <div className="shrink-0 w-64 md:w-80">
                    <Avatar src={maker.user.avatar} width={'100%'}></Avatar>
                </div>
                <div className="flex flex-col gap-4 flex-1 overflow-hidden">
                    <p className="text-body2 text-gray-900 font-bold overflow-hidden text-ellipsis">{maker.user.name}</p>
                    {maker.user.jobTitle ? <p className="text-body4 text-gray-600 font-medium">{maker.user.jobTitle}</p>
                        :
                        <p className="text-body4 text-gray-400 font-medium">No job title</p>}
                    {maker.user.roles.length ? <ul className="hidden md:flex flex-wrap gap-8 mt-4">
                        {maker.user.roles.map(role => <li key={role.id}><Badge size='sm' className='!text-body5'>{role.icon} {role.title}</Badge> </li>)}
                    </ul>
                        :
                        <p className="hidden md:block text-body4 text-gray-400">No roles added</p>
                    }
                </div>
                <span className="ml-auto hidden md:inline-block">{actionBtn}</span>
            </div>
            <hr className="hidden md:block bg-gray-200 mt-24"></hr>

            <div className="md:hidden mt-24">
                <p className="text-body5 text-gray-900 font-medium mb-12">🌈 Roles</p>

                {maker.user.roles.length ? <ul className="flex flex-wrap gap-8">
                    {maker.user.roles.map(role => <li key={role.id}><Badge size='sm' className='!text-body5'>{role.icon} {role.title}</Badge> </li>)}
                </ul>
                    :
                    <p className="text-body4 text-gray-400">No roles added</p>
                }
            </div>

            <div className="mt-24">
                <p className="text-body5 text-gray-900 font-medium mb-12">🛠️ Skills</p>
                {maker.user.skills.length ? <ul className="flex flex-wrap gap-8">
                    {maker.user.skills.map(skill => <li key={skill.id}><Badge size='sm' className='!text-body5'>{skill.title}</Badge> </li>)}
                </ul>
                    :
                    <p className="text-body4 text-gray-400">No skills added</p>
                }
            </div>
            {isMe && <div className="mt-24">
                <p className="text-body5 text-gray-900 font-medium mb-12">🚦 Hacking status</p>
                <div className="flex flex-wrap gap-8">
                    <button
                        className={`py-8 px-16 rounded-10 border ${hackingStatus === TournamentMakerHackingStatusEnum.OpenToConnect ? "bg-primary-100 text-primary-600 border-primary-200" : "bg-gray-50 hover:bg-gray-100 border-gray-200"}`}
                        onClick={() => changeHacktingStatus(TournamentMakerHackingStatusEnum.OpenToConnect)}
                    >👋 Open to connect</button>
                    <button
                        className={`py-8 px-16 rounded-10 border ${hackingStatus === TournamentMakerHackingStatusEnum.Solo ? "bg-primary-100 text-primary-600 border-primary-200" : "bg-gray-50 hover:bg-gray-100 border-gray-200"}`}
                        onClick={() => changeHacktingStatus(TournamentMakerHackingStatusEnum.Solo)}
                    >👻 Hacking han solo</button>
                </div>
            </div>}
            <div className="md:hidden w-full mt-24">{actionBtn}</div>
            {missingFields && <InfoCard className="!bg-warning-50 !border-warning-200 mt-24">
                <span className="font-bold">👾 Complete your profile:</span> make it easy for other makers to find you by adding your <span className="font-bold">{missingFields}</span>. You can add this information in your profile’s <Link to={createRoute({ type: "edit-profile" })} className='underline text-blue-500'>Settings ⚙️ menu.</Link>
            </InfoCard>}
        </Card>
    )
}


function getMissingFields(maker: Props['maker']) {
    let res: string[] = [];

    if (!maker.user.jobTitle) res.push("job title")

    if (maker.user.roles.length === 0) res.push('roles')

    if (maker.user.skills.length === 0) res.push('skills')

    if (!maker.user.linkedin && !maker.user.twitter) res.push('contacts')

    return res.join(', ');

}