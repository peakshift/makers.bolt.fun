import { marked } from "marked";
import Card from "src/Components/Card/Card";
import OgTags from "src/Components/OgTags/OgTags";
import { purifyHtml } from "src/utils/validation";
import { useTournament } from "../../TournamentDetailsPage/TournamentDetailsContext";
import FAQsSection from "../FAQsSection/FAQsSection";
import JudgesSection from "../JudgesSection/JudgesSection";
import PrizesSection from "../PrizesSection/PrizesSection";
import RegisterCard from "../RegisterCard/RegisterCard";
import ScheduleSection from "../ScheduleSection/ScheduleSection";

export default function NostrHackWeekOverviewPage() {
  const {
    tournamentDetails,
    makers,
    myParticipationInfo,
    staticData: { partners, chat, tracksAndPrizes, config },
  } = useTournament();

  return (
    <>
      <OgTags
        title={tournamentDetails.title}
        description="A 2 week for building and designing on Nostr and Bitcoin"
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
            partners={partners}
            chat={chat}
          />
        </div>
        <PrizesSection tracks={tracksAndPrizes} />
        <ScheduleSection />
        <JudgesSection judges={tournamentDetails.judges} />
      </Card>
      <Card
        onlyMd
        className="flex flex-col gap-42 bg-white max-md:-mx-16 px-16 max-md:py-16 md:mt-16"
      >
        <FAQsSection faqs={tournamentDetails.faqs} />
      </Card>
      <Card
        onlyMd
        className="flex flex-col gap-42 bg-white max-md:-mx-16 px-16 max-md:py-16 md:mt-16 mb-80"
      >
        <h2 className="text-body1 font-bolder text-gray-900 mb-4">
          Community Partners
        </h2>
        <p>
          <img
            src="https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/632c24ae-a49f-41e6-a431-871fbb8ff500/public"
            alt="Nostr Design Community - Nostrica Conference - SATSx Hackathon"
            className="w-full"
          />
        </p>
      </Card>
    </>
  );
}
