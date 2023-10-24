import dayjs from "dayjs";
import { BsClockFill } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import Accordion from "src/Components/Accordion/Accordion";
import Card from "src/Components/Card/Card";
import { createRoute } from "src/utils/routing";
import { useTournament } from "../../TournamentDetailsPage/TournamentDetailsContext";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export default function ScheduleSection() {
  const {
    tournamentDetails: { schedule },
  } = useTournament();

  if (!schedule || schedule.length === 0)
    return (
      <div>
        <p className="text-center py-24 text-gray-500 font-medium text-body3">
          Schedule is being finalized. You will be updated as soon as we have it
          ready. 🙌
        </p>
      </div>
    );

  return (
    <div>
      <h2 className="text-body1 font-bolder text-gray-900 mb-4">Schedule</h2>
      <p className="text-body3 text-gray-500">
        Follow all events live or on catch-up.{" "}
      </p>
      <Card className="!py-0 mt-16">
        <Accordion
          classes={{
            heading: "!text-body3",
          }}
          items={schedule.map((day) => ({
            heading: (
              <div className="flex items-center grow">
                <p className="text-body2 text-gray-700">
                  {day.date}
                  <sup>{getOrdinalSuffix(day.date)}</sup>
                </p>

                <span className="text-body5 font-light inline-block ml-auto mr-16 text-gray-400">
                  {day.events.length} Events
                </span>
              </div>
            ),
            content: (
              <div className={`text-gray-600 `}>
                <ul className="">
                  {day.events.map((event, idx) => (
                    <div
                      key={idx}
                      className="py-16 first-of-type:pt-0 flex gap-32 flex-wrap items-start last-of-type:border-b-0 border-b border-gray-100"
                    >
                      <div className="">
                        <BsClockFill />
                      </div>

                      <div className="">
                        <h4 className="text-body3 font-bold">{event.title}</h4>
                        <p className="text-body4 text-gray-500">
                          {dayjs(event.time).utc().format("h:mm A")}
                          {event.timezone && ` ${event.timezone}`} /{" "}
                          {dayjs(event.time).format("h:mm A")} (Local)
                        </p>
                      </div>

                      <div className="flex flex-shrink-0 text-blue-500 self-center ml-auto">
                        {event.location === "Youtube" && (
                          <a
                            href={event.url!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mr-10 flex-shrink-0 text-body3"
                          >
                            Watch{" "}
                            <FaYoutube className="text-red-600 text-body3" />
                          </a>
                        )}
                        {event.location === "Twitch" && (
                          <a
                            href={event.url!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mr-10 flex-shrink-0 text-body3"
                          >
                            Watch{" "}
                            <FaYoutube className="text-red-600 text-body3" />
                          </a>
                        )}
                        {event.location === "BoltFun" && (
                          <Link
                            to={createRoute({ type: "hangout" })}
                            className="mr-10 flex-shrink-0 text-body3"
                          >
                            Hangout 🔩
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
            ),
          }))}
          expandAll
        />
      </Card>
    </div>
  );
}

// function to convert date string from format: 'Thursday March 16' to format: 'Thursday March 16th'
function getOrdinalSuffix(date: string) {
  const day = date.split(" ")[2];
  const suffix = ["th", "st", "nd", "rd"];
  const val = parseInt(day);
  return suffix[(val % 100) - 20] || suffix[val] || suffix[0];
}
