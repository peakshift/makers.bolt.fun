import { useMemo } from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import { Project, Tournament } from "src/graphql";
import { openModal } from "src/redux/features/modals.slice";
import { useAppDispatch } from "src/utils/hooks";
import { useTournament } from "../../TournamentDetailsPage/TournamentDetailsContext";
import styles from "./styles.module.scss";

interface Props {
  prizes: Tournament["prizes"];
}

export default function PrizesSection({ prizes }: Props) {
  const { winningProjects } = useTournament();

  const projectsMap = useMemo(() => {
    const map = new Map<string, typeof winningProjects[number]>();
    for (const project of winningProjects) {
      map.set(project.hashtag, project);
    }
    return map;
  }, [winningProjects]);

  console.log(projectsMap);

  return (
    <div>
      <h2 className="text-body1 font-bolder text-gray-900 mb-16">
        {data.tracks.length > 0 ? "Prizes & Tracks" : "Prizes"}
      </h2>
      <div className="flex flex-col gap-16">
        {data.tracks.map((track, trackNumber) => (
          <div
            key={track.id}
            className="bg-gray-50 rounded-16 border-2 border-gray-100 p-16 md:p-40"
          >
            <div className="flex justify-between gap-24 flex-col md:flex-row">
              <div className="flex flex-col items-start gap-8 max-w-[400px]">
                <img
                  src={track.image}
                  alt={`${track.title} track prize`}
                  className="h-[64px]"
                />
                <h3 className="text-body2 text-gray-900 font-bolder">
                  {track.title}
                </h3>
                <p className="text-body4 text-gray-500">{track.description}</p>
                <div className="flex gap-8 mt-8">
                  <p className="text-body6 text-gray-500">Sponsored by </p>{" "}
                  <img
                    src={track.sponsor.logo}
                    alt="sponsor logo"
                    className="h-16"
                  />
                </div>
              </div>
              <div className={`md:text-right ${styles.prizes}`}>
                {renderPrizes(track.prizes, projectsMap as any, trackNumber)}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <div className={styles.grid}>
        {prizes.map((prize, idx) => <div
          key={idx}
          className='bg-gray-50 rounded-16 py-24 px-32'>
          <img src={prize.image} className=' max-w-[64px]' alt="" />
          <div>
            <h3 className="text-h2 mb-8">{prize.title}</h3>
            <p className="text-h1 text-green-500">{prize.amount}</p>
          </div>
        </div>)}
      </div> */}
    </div>
  );
}

const renderPrizes = (
  prizes: typeof data.tracks[number]["prizes"],
  projectsMap: Map<string, Partial<Project>>,
  trackNumber: number
) => {
  if (prizes.length === 3) {
    const [prize1, prize2, prize3] = prizes;

    const project1 = projectsMap.get(prize1.project);
    const project2 = projectsMap.get(prize2.project);
    const project3 = projectsMap.get(prize3.project);

    if (!project1 || !project2 || !project3) return;

    return (
      <div className="flex flex-col md:justify-end flex-wrap gap-40">
        <div className="flex flex-col md:items-end">
          <h4 className={`text-h2 mb-8`}>{prize1.title}</h4>
          <ProjectThumbnail project={project1!} />
        </div>
        <div className="flex flex-col md:items-end">
          <h4 className={`text-body2 mb-8`}>{prize2.title}</h4>
          <div className="flex gap-16">
            <ProjectThumbnail project={project2!} />
            <ProjectThumbnail project={project3!} />
          </div>
        </div>
      </div>
    );
  }
  if (prizes.length === 4) {
    const [prize1, ...restPrizes] = prizes;

    if (!projectsMap.get(prize1.project!)) return;

    return (
      <div className="flex flex-col md:justify-end flex-wrap gap-40">
        <div className="flex flex-col md:items-end">
          <h4 className={`text-h2 mb-8`}>{prize1.title}</h4>
          <ProjectThumbnail project={projectsMap.get(prize1.project!)!} />
        </div>
        <div className="flex gap-36 flex-wrap">
          {restPrizes.map((prize, idx) => (
            <div key={prize.id} className="flex flex-col md:items-end">
              <h4 className="text-body2 mb-8">{prize.title}</h4>
              <ProjectThumbnail project={projectsMap.get(prize.project!)!} />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

const ProjectThumbnail = ({ project }: { project: Partial<Project> }) => {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({});

  const dispatch = useAppDispatch();

  const onClick = () =>
    dispatch(
      openModal({
        Modal: "ProjectDetailsCard",
        props: { projectId: project.id! },
      })
    );

  return (
    <button
      onClick={onClick}
      className="w-48 bg-white rounded-12 border border-gray-200 aspect-square"
      ref={setTriggerRef}
    >
      <img
        src={project.thumbnail_image!}
        className="w-full h-full rounded-12 object-cover"
        alt={`${project.title}`}
      />
      <div
        ref={setTooltipRef}
        {...getTooltipProps({ className: "tooltip-container z-10" })}
      >
        <div {...getArrowProps({ className: "tooltip-arrow" })} />
        {visible && (
          <div className="text-left font-sans bg-white px-12 py-8 border border-gray-200 rounded-12 flex flex-wrap gap-12 shadow-lg relative z-10">
            <img
              className="w-42 h-42 rounded-12 object-cover"
              src={project.thumbnail_image!}
              alt={`${project.title}`}
            />
            <div className="overflow-hidden">
              <p
                className={`text-black font-medium overflow-hidden text-ellipsis`}
              >
                {project.title}
              </p>
              <p className={`text-body6 text-gray-600`}>
                {project.category?.icon} {project.category?.title}
              </p>
            </div>
          </div>
        )}
      </div>
    </button>
  );
};

const data = {
  prizes: [],
  tracks: [
    {
      id: 1,
      title: "Grand Champion",
      description:
        "The Legend of Lightning will be the best in show, la créme de la créme. Every project entered will be eligible for this award, no matter what track they choose.",
      image: "https://i.ibb.co/2gMLDmJ/grand-prize.png",
      prizes: [
        {
          id: 1,
          title: "the legend",
          amount: "1 BTC",
          project: "Lightsats",
        },
        {
          id: 2,
          title: "Runners UP x2",
          amount: "0.5 BTC",
          project: "mutiny",
        },
        {
          id: 3,
          title: "Runners UP x2",
          amount: "0.5 BTC",
          project: "agrimint",
        },
      ],
      sponsor: {
        logo: "https://i.ibb.co/gTX30Rq/fulgur.png",
      },
    },
    {
      id: 2,
      title: "Global Adoption Track",
      description:
        "Focusing on scalability and product market fit, this track allows makers to let their imaginations run wild with either lightning or on-chain technology.",
      image: "https://i.ibb.co/d4vxYXD/global-adoption-lg.png",
      prizes: [
        {
          id: 2,
          title: " 1st",
          amount: "$5k",
          project: "Lightsats",
        },
        {
          id: 3,
          title: " 2nd",
          amount: "$2.5k",
          project: "mutiny",
        },
        {
          id: 4,
          title: " 3rd",
          amount: "$1.5k",
          project: "nolooking",
        },
        {
          id: 5,
          title: " Design",
          amount: "$1k",
          project: "saving-satoshi",
        },
      ],
      sponsor: {
        logo: "https://i.ibb.co/gTX30Rq/fulgur.png",
      },
    },
    {
      id: 3,
      title: "Building for Africa",
      description:
        "In partnership with ABC 22, this track seeks to encourage makers to build solutions that solve African challenges & increase bitcoin adoption by Africans.",
      image: "https://i.ibb.co/TW8FqRN/Africa-track-thin.png",
      prizes: [
        {
          id: 6,
          title: " 1st",
          amount: "$5k",
          project: "agrimint",
        },
        {
          id: 7,
          title: " 2nd",
          amount: "$2.5k",
          project: "lnvpn",
        },
        {
          id: 8,
          title: " 3rd",
          amount: "$1.5k",
          project: "bitpayroll",
        },
        {
          id: 9,
          title: " Design",
          amount: "$1k",
          project: "agrimint",
        },
      ],
      sponsor: {
        logo: "https://i.ibb.co/wRvRQ0h/Frame-251.png",
      },
    },
  ],
};

export const getWinnersIds = () => {
  const ids = new Set<string>();
  data.tracks.forEach((track) => {
    track.prizes.forEach((prize) => ids.add(prize.project));
  });

  return Array.from(ids);
};
