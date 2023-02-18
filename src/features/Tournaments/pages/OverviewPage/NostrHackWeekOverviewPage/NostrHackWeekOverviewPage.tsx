import DOMPurify from "dompurify";
import { marked } from "marked";
import Card from "src/Components/Card/Card";
import OgTags from "src/Components/OgTags/OgTags";
import { useTournament } from "../../TournamentDetailsPage/TournamentDetailsContext";
import FAQsSection from "../FAQsSection/FAQsSection";
import JudgesSection from "../JudgesSection/JudgesSection";
import PrizesSection from "../PrizesSection/PrizesSection";
import RegisterCard from "../RegisterCard/RegisterCard";
import { partners, tracksAndPrizes, chat } from "./tournament-data";

export default function NostrHackWeekOverviewPage() {
  const { tournamentDetails, makers, myParticipationInfo } = useTournament();

  return (
    <>
      <OgTags
        title={tournamentDetails.title}
        image={tournamentDetails.cover_image}
      />
      <Card
        onlyMd
        className="flex flex-col gap-42 bg-white max-md:-mx-16 max-md:-mt-24 px-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24 items-start">
          <div className="md:col-span-2">
            <div
              className={`text-gray-600 prose `}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  marked.parse(tournamentDetails.description)
                ),
              }}
            ></div>
          </div>
          <RegisterCard
            makers_count={tournamentDetails.makers_count}
            start_date={tournamentDetails.start_date}
            avatars={makers.map((m) => m.user.avatar)}
            isRegistered={!!myParticipationInfo}
            isRegistrationOpen
            partners={partners}
            chat={chat}
          />
        </div>
        <PrizesSection tracks={tracksAndPrizes} />
        <JudgesSection judges={tournamentDetails.judges} />
      </Card>
      <Card
        onlyMd
        className="flex flex-col gap-42 bg-white max-md:-mx-16 max-md:-mt-24 px-16 mt-16 mb-80"
      >
        <FAQsSection faqs={tournamentDetails.faqs} />
      </Card>
    </>
  );
}