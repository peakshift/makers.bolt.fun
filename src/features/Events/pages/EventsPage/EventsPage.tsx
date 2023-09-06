import { UpcomingTournamentCard } from "../../components/UpcomingTournamentCard";

export function EventsPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold">Upcoming Tournaments</h1>
      <div className="flex mt-16 gap-x-20">
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
    </main>
  );
}
