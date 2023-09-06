import { CompletedTournamentCard } from "../../components/CompletedTournamentCard";
import { UpcomingTournamentCard } from "../../components/UpcomingTournamentCard";

export function EventsPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold">Upcoming Tournaments</h1>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 md:gap-x-20 gap-y-20 md:gap-y-0">
        <UpcomingTournamentCard
          type="🏆 TOURNAMENT"
          title="Legends Of Lightning II"
          description="Lorem ipsum dolor sit amet consectetur. Consectetur auctor olor sit amet consectetur. "
          date={new Date()}
        />
        <UpcomingTournamentCard
          type="🏆 TOURNAMENT"
          title="Nostrasia Hackathon"
          description="Lorem ipsum dolor sit amet consectetur. Consectetur auctor olor sit amet consectetur. "
          date={new Date()}
        />
      </div>
      <div className="w-full h-px my-32 bg-gray-200" />
      <h1 className="text-2xl font-bold">Completed</h1>
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-16">
        <CompletedTournamentCard
          title="Getting Started Setting up Your Node with Voltage"
          description="Lorem ipsum dolor sit amet consectetur. Consectetur auctor olor sit amet consectetur."
        />
        <CompletedTournamentCard
          title="How to Build Your Own Community Bank on Bitcoin"
          description="Lorem ipsum dolor sit amet consectetur. Consectetur auctor olor sit amet consectetur."
        />
        <CompletedTournamentCard
          title="Terminus Workshop #46"
          description="Lorem ipsum dolor sit amet consectetur. Consectetur auctor olor sit amet consectetur."
        />
      </div>
    </main>
  );
}
