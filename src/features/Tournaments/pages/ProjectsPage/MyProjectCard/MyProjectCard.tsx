import { MeTournamentQuery, } from "src/graphql";
import { useAppDispatch, } from "src/utils/hooks";
import Card from 'src/Components/Card/Card';
import { createRoute } from 'src/utils/routing';
import { Link } from "react-router-dom";
import { useTournament } from "../../TournamentDetailsPage/TournamentDetailsContext";
import Button from "src/Components/Button/Button";
import { openModal } from "src/redux/features/modals.slice";

type ProjectType = NonNullable<MeTournamentQuery['tournamentParticipationInfo']>['projects'][number]

interface Props {
    projectTournament: ProjectType,
}

export default function MyProjectCard({ projectTournament: { project, track } }: Props) {

    const dispatch = useAppDispatch();
    // const [hackingStatus, setHackingStatus] = useState(maker.hacking_status)

    const { tournamentDetails: { id: tournamentId } } = useTournament()

    const openProject = () => {
        dispatch(openModal({
            Modal: "ProjectDetailsCard",
            props: {
                projectId: project.id
            }
        }))
    }

    return (
        <Card>
            <div className="flex flex-wrap gap-24 items-start">
                <img src={project.thumbnail_image} className='shrink-0 w-64 md:w-80 aspect-square rounded-12 border border-gray-100 object-cover' alt="" />
                <div className="flex flex-col gap-4 flex-1 overflow-hidden min-w-min">
                    <p className="text-body2 text-gray-900 font-bold overflow-hidden text-ellipsis">{project.title}</p>
                    <p className="text-body4 text-gray-600 font-medium">{project.category.icon} {project.category.title}</p>
                </div>
                <div className="flex gap-8 ml-auto">
                    <Button size="sm" onClick={(e) => { e.currentTarget.focus(); openProject(); }}>View details</Button>
                    <Button color="primary" size="sm" href={createRoute({ type: "write-story" })}>🚦 Post update</Button>
                </div>
            </div>
            <hr className="bg-gray-200 my-24"></hr>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
                <div>
                    <p className="text-body4 text-gray-80">{track?.icon} {track?.title}</p>
                    <p className="text-body5 text-gray-600">Track</p>
                </div>
            </div>
        </Card>
    )
}

