import { useMemo } from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import { Project, useGetTournamentWinningProjectsQuery } from "src/graphql";
import { openModal } from "src/redux/features/modals.slice";
import { useAppDispatch } from "src/utils/hooks";
import styles from "./styles.module.scss";

export type TrackAndPrizes = {
  id: number;
  title: string;
  description: string;
  image: string;
  prizes: Array<{
    id: number;
    title: string;
    amount: string;
    project?: string;
  }>;
  additionalPrizes?: Array<{
    text: string;
    url?: string;
  }>;
  sponsor?: {
    logo: string;
  };
};

interface Props {
  tracks: TrackAndPrizes[];
}

export default function PrizesSection({ tracks }: Props) {
  const query = useGetTournamentWinningProjectsQuery({
    variables: { winning_projects: getWinnersIds(tracks) },
  });

  const winningProjects = query.data?.getProjectsById;

  const winningProjectsMap = useMemo(() => {
    if (!winningProjects) return null;
    const map = new Map<string, typeof winningProjects[number]>();
    for (const project of winningProjects) {
      map.set(project.hashtag, project);
    }
    return map;
  }, [winningProjects]);

  return (
    <div>
      <h2 className="text-body1 font-bolder text-gray-900 mb-16">
        {tracks.length > 0 ? "Prizes & Tracks" : "Prizes"}
      </h2>
      <div className="flex flex-col gap-16">
        {tracks.map((track, trackNumber) => (
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
                <p className="text-body4 text-gray-500 whitespace-pre-line">
                  {track.description}
                </p>
                {track.sponsor && (
                  <div className="flex gap-8 mt-8">
                    <p className="text-body6 text-gray-500">Sponsored by </p>{" "}
                    <img
                      src={track.sponsor.logo}
                      alt="sponsor logo"
                      className="h-16"
                    />
                  </div>
                )}
              </div>
              <div className={`md:text-right ${styles.prizes}`}>
                {renderPrizes(
                  track.prizes,
                  winningProjectsMap as Map<string, Partial<Project>> | null,
                  trackNumber
                )}
                {track.additionalPrizes && track.additionalPrizes.length > 0 && (
                  <ul className="text-gray-500 mt-16 flex flex-col font-sans font-medium">
                    {track.additionalPrizes.map((prize, idx) => (
                      <li key={idx} className="">
                        {prize.url ? (
                          <a href={prize.url} target="_blank" rel="noreferrer">
                            <span className="scale-150">+</span> {prize.text}
                          </a>
                        ) : (
                          <>
                            <span className="scale-150">+</span> {prize.text}
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
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
  prizes: TrackAndPrizes["prizes"],
  winningProjectsMap: Map<string, Partial<Project>> | null,
  trackNumber: number
) => {
  if (prizes.length === 1) {
    return (
      <div>
        <h4 className="text-[32px] leading-[1em]">{prizes[0].title}</h4>
        <p className="text-[118px] leading-[1em]" data-attr={trackNumber + 1}>
          {prizes[0].amount}
        </p>
      </div>
    );
  }

  if (prizes.length === 2) {
    return (
      <div className="flex flex-col gap-40">
        <div>
          <h4 className="text-[32px] leading-[1em]">{prizes[0].title}</h4>
          <p className="text-[72px]  leading-[1em]" data-attr={trackNumber + 1}>
            {prizes[0].amount}
          </p>
        </div>
        <div>
          <h4 className="text-[20px] leading-[1em]">{prizes[1].title}</h4>
          <p className="text-[36px] leading-[1em]" data-attr={trackNumber + 1}>
            {prizes[1].amount}
          </p>
        </div>
      </div>
    );
  }

  if (prizes.length === 3) {
    if (winningProjectsMap?.size) {
      const [prize1, prize2, prize3] = prizes;

      const project1 = winningProjectsMap.get(prize1.project ?? "");
      const project2 = winningProjectsMap.get(prize2.project ?? "");
      const project3 = winningProjectsMap.get(prize3.project ?? "");

      if (!project1 || !project2 || !project3) return;

      return (
        <div className="flex flex-col md:justify-end md:items-end flex-wrap gap-40">
          <div className="flex flex-col md:items-end">
            <h4 className={`text-h2 mb-8`}>{prize1.title}</h4>
            <ProjectThumbnail project={project1!} />
          </div>

          <div className="flex gap-36 flex-wrap min-w-0">
            <div className="flex flex-col md:items-end">
              <h4 className={`text-body2 mb-8`}>{prize2.title}</h4>
              <div className="flex gap-16">
                <ProjectThumbnail project={project2!} />
              </div>
            </div>
            <div className="flex flex-col md:items-end">
              <h4 className={`text-body2 mb-8`}>{prize3.title}</h4>
              <div className="flex gap-16">
                <ProjectThumbnail project={project3!} />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex md:justify-end flex-wrap gap-40">
          {prizes.map((prize, idx) => (
            <div key={prize.id} className="first:w-full">
              <h4 className={`${idx === 0 ? "text-h2" : "text-body2"}`}>
                {prize.title}
              </h4>
              <p
                className={`${idx === 0 ? "text-[48px]" : "text-[36px]"}`}
                data-attr={trackNumber + 1}
              >
                {prize.amount}
              </p>
            </div>
          ))}
        </div>
      );
    }
  }
  if (prizes.length === 4) {
    const [prize1, ...restPrizes] = prizes;
    if (winningProjectsMap?.size) {
      if (!winningProjectsMap.get(prize1.project!)) return;

      return (
        <div className="flex flex-col md:justify-end flex-wrap gap-40">
          <div className="flex flex-col md:items-end">
            <h4 className={`text-h2 mb-8`}>{prize1.title}</h4>
            <ProjectThumbnail
              project={winningProjectsMap.get(prize1.project!)!}
            />
          </div>
          <div className="flex gap-36 flex-wrap">
            {restPrizes.map((prize, idx) => (
              <div key={prize.id} className="flex flex-col md:items-end">
                <h4 className="text-body2 mb-8">{prize.title}</h4>
                <ProjectThumbnail
                  project={winningProjectsMap.get(prize.project!)!}
                />
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex md:justify-end flex-wrap gap-40">
          {prizes.map((prize, idx) => (
            <div key={prize.id} className="first:w-full">
              <h4 className={`${idx === 0 ? "text-h2" : "text-body2"}`}>
                {prize.title}
              </h4>
              <p
                className={`${idx === 0 ? "text-[48px]" : "text-[36px]"}`}
                data-attr={trackNumber + 1}
              >
                {prize.amount}
              </p>
            </div>
          ))}
        </div>
      );
    }
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
      {visible && (
        <div ref={setTooltipRef} {...getTooltipProps({ className: "" })}>
          <div {...getArrowProps({ className: "tooltip-arrow" })} />
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
        </div>
      )}
    </button>
  );
};

export const getWinnersIds = (tracks: TrackAndPrizes[]) => {
  const ids = new Set<string>();
  tracks.forEach((track) => {
    track.prizes.forEach((prize) => prize.project && ids.add(prize.project));
  });

  return Array.from(ids);
};
