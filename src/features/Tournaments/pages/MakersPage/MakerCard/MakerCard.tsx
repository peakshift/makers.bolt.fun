import { IoLocationOutline } from 'react-icons/io5'
import Button from "src/Components/Button/Button"
import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { trimText } from "src/utils/helperFunctions";
import { Override } from "src/utils/interfaces";
import { GetMakersInTournamentQuery, GetMakersInTournamentQueryResult, Tag, Tournament, TournamentEventTypeEnum, User } from "src/graphql";
import { UnionToObjectKeys } from 'src/utils/types/utils';
import { useAppDispatch, } from "src/utils/hooks";
import { openModal } from "src/redux/features/modals.slice";
import Card from 'src/Components/Card/Card';
import Avatar from 'src/features/Profiles/Components/Avatar/Avatar';
import Badge from 'src/Components/Badge/Badge';
import { createRoute, PAGES_ROUTES } from 'src/utils/routing';

type MakerType = GetMakersInTournamentQuery['getMakersInTournament'][number]

interface Props {
    maker: GetMakersInTournamentQuery['getMakersInTournament'][number],
    isMe?: boolean;
}

export default function MakerCard({ maker, isMe }: Props) {

    const dispatch = useAppDispatch()


    return (
        <Card>
            <div className="flex flex-wrap gap-24 items-start">
                <div className="shrink-0 w-64 md:w-80">
                    <Avatar src={maker.avatar} width={'100%'}></Avatar>
                </div>
                <div className="flex flex-col gap-4 flex-1">
                    <p className="text-body2 text-gray-900 font-bold">{maker.name}</p>
                    {maker.jobTitle ? <p className="text-body4 text-gray-600 font-medium">{maker.jobTitle}</p>
                        :
                        <p className="text-body4 text-gray-400 font-medium">No job title</p>}
                    {maker.roles.length ? <ul className="hidden md:flex flex-wrap gap-8 mt-4">
                        {maker.roles.map(role => <li><Badge size='sm' className='!text-body5'>{role.icon} {role.title}</Badge> </li>)}
                    </ul>
                        :
                        <p className="hidden md:block text-body4 text-gray-400">No roles added</p>
                    }
                </div>
                {isMe && <span className="ml-auto hidden md:inline-block"><Button color='white' href={createRoute({ type: 'edit-profile' })} size='sm' className='ml-auto'>Edit Profile</Button></span>}
            </div>
            <hr className="hidden md:block bg-gray-200 mt-24"></hr>

            <div className="md:hidden mt-24">
                <p className="text-body5 text-gray-900 font-medium mb-12">🌈 Roles</p>

                {maker.roles.length ? <ul className="flex flex-wrap gap-8">
                    {maker.roles.map(role => <li><Badge size='sm' className='!text-body5'>{role.icon} {role.title}</Badge> </li>)}
                </ul>
                    :
                    <p className="text-body4 text-gray-400">No roles added</p>
                }
            </div>

            <div className="mt-24">
                <p className="text-body5 text-gray-900 font-medium mb-12">🛠️ Skills</p>
                {maker.skills.length ? <ul className="flex flex-wrap gap-8">
                    {maker.skills.map(skill => <li><Badge size='sm' className='!text-body5'>{skill.title}</Badge> </li>)}
                </ul>
                    :
                    <p className="text-body4 text-gray-400">No skills added</p>
                }
            </div>
            {isMe && <Button fullWidth color='white' href={createRoute({ type: 'edit-profile' })} size='sm' className='mt-32 md:hidden'>Edit Profile</Button>}        </Card>
    )
}
