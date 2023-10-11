import { IoLocationOutline } from "react-icons/io5";
import { markdownToText, trimText } from "src/utils/helperFunctions";
import { Tournament, TournamentEventTypeEnum } from "src/graphql";
import { UnionToObjectKeys } from "src/utils/types/utils";
import { useAppDispatch } from "src/utils/hooks";
import { openModal } from "src/redux/features/modals.slice";
import dayjs from "dayjs";

interface Props {
  event: Pick<
    Tournament["events"][number],
    | "id"
    | "title"
    | "image"
    | "starts_at"
    | "ends_at"
    | "location"
    | "description"
    | "website"
    | "type"
  >;
}

export const getSpanDate = (_date1: string, _date2: string) => {
  const date1 = new Date(_date1);
  const date2 = new Date(_date2);

  const isSameMonth = date1.getMonth() === date2.getMonth();
  if (!isSameMonth)
    return `${dayjs(_date1).format("Do MMM")} - ${dayjs(_date2).format(
      "Do MMM"
    )}`;

  const isSameDay = date1.getDay() === date2.getDay();
  if (!isSameDay)
    return `${dayjs(_date1).format("Do")} - ${dayjs(_date2).format("Do MMM")}`;
  // Same Day
  return `${dayjs(_date1).format("H:mm")} - ${dayjs(_date2).format(
    "H:mm, Do MMM"
  )}`;
};

export default function EventCard({ event }: Props) {
  const dispatch = useAppDispatch();

  const openEventModal = () => {
    dispatch(
      openModal({
        Modal: "EventModal",
        isPageModal: true,
        props: {
          event,
        },
      })
    );
  };

  // If single day => show time - time, day mon
  // If multi-days:
  //  if same month: day - day mon
  //  if diff month: day mon - day mon

  return (
    <div
      role="button"
      className="rounded-16 bg-white overflow-hidden outline outline-2 outline-gray-200 flex flex-col group"
      onClick={openEventModal}
    >
      <img
        className="w-full h-[160px] object-cover rounded-t-16"
        src={event.image}
        alt=""
      />
      <div className="p-16 grow flex flex-col">
        <div className="flex flex-col gap-8">
          <h3 className="text-body2 font-bold text-gray-900 group-hover:underline">
            {event.title}
          </h3>
          <p className="text-body4 font-medium text-gray-900">
            {getSpanDate(event.starts_at, event.ends_at)}
          </p>
          <p className="text-body4 font-medium text-gray-600">
            <IoLocationOutline className="mr-4" />{" "}
            <span className="align-middle">{event.location}</span>
          </p>
          <p className="text-body4 text-gray-600 line-clamp-2">
            {trimText(markdownToText(event.description), 90)}
          </p>
          <span
            className={`mt-8 text-body5 self-start px-8 py-4 rounded-20 ${
              mapTypeToBadge[event.type].color
            }`}
          >
            {mapTypeToBadge[event.type].text}
          </span>
        </div>
      </div>
    </div>
  );
}

export const mapTypeToBadge: UnionToObjectKeys<
  Props["event"],
  "type",
  { text: string; color: string }
> = {
  [TournamentEventTypeEnum.TwitterSpace]: {
    text: "🐦 Twitter space",
    color: "bg-blue-50 text-blue-500",
  },
  [TournamentEventTypeEnum.Workshop]: {
    text: "🛠️ Workshop",
    color: "bg-green-50 text-green-500",
  },
  [TournamentEventTypeEnum.IrlMeetup]: {
    text: "🤝 IRL meetup",
    color: "bg-red-50 text-red-500",
  },
  [TournamentEventTypeEnum.OnlineMeetup]: {
    text: "🤖 Online meetup",
    color: "bg-violet-50 text-violet-500",
  },
};
