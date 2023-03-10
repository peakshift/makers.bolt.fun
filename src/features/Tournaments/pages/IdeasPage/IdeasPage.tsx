import { useState } from "react";
import { TournamentEventTypeEnum } from "src/graphql";
import EventCard from "./EventCard/EventCard";
import EventsFilters from "./EventsFilters/EventsFilters";

export default function IdeasPage() {
  const [searchFilter, setSearchFilter] = useState("");
  const [eventFilter, setEventFilter] =
    useState<TournamentEventTypeEnum | null>(null);

  return (
    <div className="pb-42">
      {/* <div className="flex gap-24 justify-between">
                <h2 className='text-body1 font-bolder text-gray-900 mb-24'>Events 📆 ({events_count})</h2>
                <Button size='sm' variant='text' href='https://airtable.com/shrjVx8MjLfl8zyXD' color='gray' newTab className='ml-auto'>List an event</Button>
            </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24">
        <EventsFilters
          searchValue={searchFilter}
          onSearchChange={setSearchFilter}
          eventValue={eventFilter}
          onEventChange={setEventFilter}
        />
      </div>
    </div>
  );
}
