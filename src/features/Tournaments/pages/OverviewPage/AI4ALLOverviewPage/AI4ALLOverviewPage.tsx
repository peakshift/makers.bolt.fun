import { marked } from "marked";
import Card from "src/Components/Card/Card";
import OgTags from "src/Components/OgTags/OgTags";
import { purifyHtml } from "src/utils/validation";
import { useTournament } from "../../TournamentDetailsPage/TournamentDetailsContext";
import FAQsSection from "../FAQsSection/FAQsSection";
import PrizesSection from "../PrizesSection/PrizesSection";
import RegisterCard from "../RegisterCard/RegisterCard";

export default function LegendsOfLightningOverviewPage() {
  const {
    tournamentDetails,
    makers,
    myParticipationInfo,
    staticData: { partnersList, chat, tracksAndPrizes, config },
  } = useTournament();

  return (
    <>
      <OgTags
        title={tournamentDetails.title}
        image={tournamentDetails.cover_image}
      />
      <Card
        onlyMd
        className="flex flex-col gap-42 bg-white max-md:-mx-16 px-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24 items-start">
          <div className="md:col-span-2">
            <div
              className={`text-gray-600 prose `}
              dangerouslySetInnerHTML={{
                __html: purifyHtml(marked.parse(tournamentDetails.description)),
              }}
            ></div>
          </div>
          <RegisterCard
            makers_count={tournamentDetails.makers_count}
            start_date={tournamentDetails.start_date}
            avatars={makers.map((m) => m.user.avatar)}
            isRegistered={!!myParticipationInfo}
            isRegistrationOpen={config.registerationOpen}
            partnersList={partnersList}
            chat={chat}
          />
        </div>
        <PrizesSection tracks={tracksAndPrizes} />
        {/* <JudgesSection judges={tournamentDetails.judges} /> */}
        <FAQsSection faqs={tournamentDetails.faqs} />
      </Card>
    </>
  );
}
