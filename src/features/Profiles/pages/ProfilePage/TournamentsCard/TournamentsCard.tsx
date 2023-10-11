import Card from "src/Components/Card/Card";
import {
  ProjectDetailsQuery,
  ProjectTournament,
  TournamentTrack,
  User,
} from "src/graphql";
import { Link } from "react-router-dom";
import { Override } from "src/utils/interfaces";
import Badge from "src/Components/Badge/Badge";

interface Props {
  tournaments: Override<
    ProjectDetailsQuery["getProject"]["tournaments"][number],
    {
      track: Pick<TournamentTrack, "title" | "icon"> | null;
    }
  >[];
  isOwner?: boolean;
  onlyMd?: boolean;
}

export default function TournamentsCard({
  tournaments,
  isOwner,
  onlyMd,
}: Props) {
  return (
    <Card onlyMd={onlyMd}>
      <p className="text-body2 font-bold">🏆 Tournaments </p>
      <div className="mt-16">
        {tournaments.length === 0 && (
          <>
            <p className="text-gray-700 text-body4">No tournaments entered.</p>
          </>
        )}
        <ul className=" flex flex-wrap gap-x-8 gap-y-20">
          {tournaments.map((item) => {
            const status = getDateStatus(
              item.tournament.start_date,
              item.tournament.end_date
            );
            return (
              <li key={item.tournament.id}>
                <Link
                  to={"/tournaments/" + item.tournament.id}
                  className="flex gap-16 items-start"
                >
                  <img
                    src={item.tournament.thumbnail_image}
                    className="w-48 border-2 border-gray-100 aspect-square rounded-16 object-cover"
                    alt=""
                  />
                  <div>
                    <p className="text-gray-900 font-medium">
                      {item.tournament.title}
                    </p>
                    {item.track && (
                      <p className="text-body5 text-gray-500 font-medium">
                        {item.track.title} Track {item.track.icon}
                      </p>
                    )}
                    <p
                      className={`
                                    text-body5 font-medium
                                    ${status === "live" && "text-green-500"}
                                    ${
                                      status === "upcoming" && "text-violet-500"
                                    }
                                    ${
                                      status === "finished" &&
                                      "text-warning-500"
                                    }  
                                    `}
                    >
                      &#8226; {status === "live" && "Running"}
                      {status === "upcoming" && "Upcoming"}
                      {status === "finished" && "Completed"}{" "}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  );
}

function getDateStatus(start: string, end: string) {
  const start_date = new Date(start);
  const now_date = new Date();
  const end_date = new Date(end);

  if (now_date < start_date) return "upcoming";
  if (now_date >= start_date && now_date <= end_date) return "live";
  return "finished";
}
