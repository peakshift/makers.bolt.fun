import OgTags from "src/Components/OgTags/OgTags";
import { CompletedTournamentCard } from "../../components/CompletedTournamentCard";
import { UpcomingTournamentCard } from "../../components/UpcomingTournamentCard";

export function EventsPage() {
  return (
    <>
      <OgTags
        title="Tournaments"
        description="It's gonna be legendary fall."
        image="https://bolt.fun/assets/images/social-share-tournament-page.png"
      />

      <main>
        <h1 className="text-2xl font-bold">Upcoming Tournaments</h1>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 md:gap-x-20 gap-y-20 md:gap-y-0">
          <UpcomingTournamentCard
            type="🏆 TOURNAMENT"
            title="Legends Of Lightning II"
            description="Lorem ipsum dolor sit amet consectetur. Consectetur auctor olor sit amet consectetur. "
            imageSrc="assets/images/legends_of_lightning.png"
            date="NOV 3"
          />
          <UpcomingTournamentCard
            type="🏆 TOURNAMENT"
            title="Nostrasia Hackathon"
            description="Lorem ipsum dolor sit amet consectetur. Consectetur auctor olor sit amet consectetur. "
            imageSrc="assets/images/nostaria.png"
            date="HAPPENING NOW"
          />
        </div>
        <div className="w-full h-px my-32 bg-gray-200" />
        <h1 className="text-2xl font-bold">Completed</h1>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-32 gap-y-32">
          <CompletedTournamentCard
            title="Ai4ALL"
            description="Lorem ipsum dolor sit amet consectetur. Consectetur auctor olor sit amet consectetur."
            imageSrc="assets/images/ai4all.png"
            date="JULY 1 - 31"
            emoji="🛠️"
          />
          <CompletedTournamentCard
            title="Nostr Hack Week"
            description="Lorem ipsum dolor sit amet consectetur. Consectetur auctor olor sit amet consectetur."
            imageSrc="assets/images/nostr-hack-week.png"
            date="MARCH 11 - 18"
            emoji="💬"
          />
          <CompletedTournamentCard
            title="Legends of Lightning"
            description="Lorem ipsum dolor sit amet consectetur. Consectetur auctor olor sit amet consectetur."
            imageSrc="assets/images/legends-of-lightning.png"
            date="OCT 12 - DEC 7 2022"
            emoji="🛠️"
          />
          <CompletedTournamentCard
            title="Shock the Web 2"
            description="Lorem ipsum dolor sit amet consectetur. Consectetur auctor olor sit amet consectetur."
            imageSrc="assets/images/shock-the-web-2.png"
            date="JUNE 16 - 19"
            emoji="🛠️"
          />
          <CompletedTournamentCard
            title="Shock the Web"
            description="Lorem ipsum dolor sit amet consectetur. Consectetur auctor olor sit amet consectetur."
            imageSrc="assets/images/shock-the-web.png"
            date="MARCH 22 - 28"
            emoji="💬"
          />
        </div>
      </main>
    </>
  );
}
