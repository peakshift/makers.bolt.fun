import { useState } from "react";
import Button from "src/Components/Button/Button";
import { TournamentEventTypeEnum } from "src/graphql";
import ScheduleSection from "../OverviewPage/ScheduleSection/ScheduleSection";
import { useTournament } from "../TournamentDetailsPage/TournamentDetailsContext";
import EventCard from "./EventCard/EventCard";
import EventsFilters from "./EventsFilters/EventsFilters";

export default function WorkshopsPage() {
  const [searchFilter, setSearchFilter] = useState("");
  const [eventFilter, setEventFilter] =
    useState<TournamentEventTypeEnum | null>(null);
  const {
    tournamentDetails: { events, events_count },
  } = useTournament();

  return (
    <div className="pb-42 flex flex-col gap-36">
      {events.length === 0 && (
        <p className="text-center py-24 text-gray-500 font-medium text-body3">
          Events not listed yet. Please check back later. 🙏
        </p>
      )}
      {events.length > 0 && (
        <div>
          <div className="flex gap-24 justify-between">
            <h2 className="text-body1 font-bolder text-gray-900 mb-24">
              Workshops ⚒️
            </h2>
            {/* <Button
              size="sm"
              variant="text"
              href="https://airtable.com/shrjVx8MjLfl8zyXD"
              color="gray"
              newTab
              className="ml-auto"
            >
              List an event
            </Button> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24">
            <EventsFilters
              searchValue={searchFilter}
              onSearchChange={setSearchFilter}
              eventValue={eventFilter}
              onEventChange={setEventFilter}
            />
            {events
              .filter((event) => {
                if (!searchFilter) return true;
                return (
                  event.title.search(new RegExp(searchFilter, "i")) !== -1 ||
                  event.description.search(new RegExp(searchFilter, "i")) !== -1
                );
              })
              .filter((event) => {
                if (!eventFilter) return true;
                return event.type === eventFilter;
              })
              .map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
