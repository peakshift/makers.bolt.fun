import { marked } from "marked";
import Card from "src/Components/Card/Card";
import OgTags from "src/Components/OgTags/OgTags";
import { purifyHtml } from "src/utils/validation";
import { useTournament } from "../../TournamentDetailsPage/TournamentDetailsContext";
import JudgesSection from "../JudgesSection/JudgesSection";
import FAQsSection from "../FAQsSection/FAQsSection";
import PrizesSection from "../PrizesSection/PrizesSection";
import ScheduleSection from "../ScheduleSection/ScheduleSection";
import RegisterCard from "../RegisterCard/RegisterCard";

export default function LegendsOfLightningOverviewPage() {
  const {
    tournamentDetails,
    makers,
    myParticipationInfo,
    staticData: { partnersList, chat, tracksAndPrizes, config, makersDeals },
  } = useTournament();

  const isRegistered = !!myParticipationInfo;

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
            {isRegistered && makersDeals && makersDeals?.length > 0 && (
              <div className="mt-32">
                <p className="text-body2 font-bolder mb-16">
                  Hacker perks from our partners 🎁
                </p>
                <ul className="flex flex-col gap-8">
                  {makersDeals.map((deal) => (
                    <li
                      className={`w-full gap-8 items-center bg-gray-100 rounded ${
                        deal.link && "hover:bg-gray-200"
                      }`}
                    >
                      {deal.link ? (
                        <a
                          href={deal.link}
                          target="_blank"
                          rel="noreferrer"
                          className="block p-16"
                        >
                          <div className="self-center text-left">
                            <p className="text-body4 text-gray-900 font-bold">
                              {deal.title}
                            </p>
                            <p className="text-body5 text-gray-600">
                              {deal.text}
                            </p>
                          </div>
                        </a>
                      ) : (
                        <div className="self-center text-left p-16">
                          <p className="text-body4 text-gray-900 font-medium">
                            {deal.title}
                          </p>
                          <p className="text-body5 text-gray-600">
                            {deal.text}
                          </p>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <RegisterCard
            makers_count={tournamentDetails.makers_count}
            start_date={tournamentDetails.start_date}
            avatars={makers.map((m) => m.user.avatar)}
            isRegistered={isRegistered}
            isRegistrationOpen={config.registerationOpen}
            partnersList={partnersList}
            chat={chat}
          />
        </div>
        <PrizesSection tracks={tracksAndPrizes} />
        <ScheduleSection />
        <JudgesSection judges={tournamentDetails.judges} />
        <FAQsSection faqs={tournamentDetails.faqs} />
      </Card>
    </>
  );
}
