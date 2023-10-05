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
            imageSrc="assets/images/legends_of_lightning.png"
            date="5th Oct - 17th Dec"
            organizerImageSrc="assets/images/fulgur.png"
            linkTo="/tournaments/legends-of-lightning-vol2"
          />
          <UpcomingTournamentCard
            type="🏆 TOURNAMENT"
            title="Nostrasia Hackathon"
            imageSrc="assets/images/nostaria.png"
            date="3rd Oct - 3rd Nov"
            organizerImageSrc="assets/images/nostr-world.png"
            linkTo="/tournaments/nostrasia"
          />
        </div>
        <div className="w-full h-px my-32 bg-gray-200" />
        <h1 className="text-2xl font-bold">Completed</h1>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-32 gap-y-32">
          <CompletedTournamentCard
            title="Ai4ALL"
            imageSrc="assets/images/ai4all.png"
            date="JULY 1 - 31"
            emoji="🛠️"
            linkTo="ai4all"
          />
          <CompletedTournamentCard
            title="Nostr Hack Week"
            imageSrc="assets/images/nostr-hack-week.png"
            date="MARCH 11 - 18"
            emoji="💬"
            linkTo="nostr-hack"
          />
          <CompletedTournamentCard
            title="Legends of Lightning"
            imageSrc="assets/images/legends-of-lightning.png"
            date="OCT 12 - DEC 7 2022"
            emoji="🛠️"
            linkTo="legends-of-lightning"
          />
          <CompletedTournamentCard
            title="Shock the Web 2"
            imageSrc="assets/images/shock-the-web-2.png"
            date="JUNE 16 - 19"
            emoji="🛠️"
            linkTo="https://guide.bolt.fun/hackathons/shock-the-web-2"
          />
          <CompletedTournamentCard
            title="Shock the Web"
            imageSrc="assets/images/shock-the-web.png"
            date="MARCH 22 - 28"
            emoji="💬"
            linkTo="https://guide.bolt.fun/hackathons/shock-the-web"
          />
        </div>
      </main>
    </>
  );
}
