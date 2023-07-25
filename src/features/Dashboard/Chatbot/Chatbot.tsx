import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import OgTags from "src/Components/OgTags/OgTags";
import Chat from "./components/Chat";
import TournamentPreview from "./components/TournamentPreview";
import { ChatContextProvider } from "./contexts/chat.context";
import { TournamentContextProvider } from "./contexts/tournament.context";

export default function ChatbotPage() {
  const [searchParams] = useSearchParams();

  const tournamentIdOrSlug = searchParams.get("tournament");

  if (!tournamentIdOrSlug) return <p>No tournament selected</p>;

  return (
    <>
      <OgTags
        title="Chatbot Commander"
        description="Update stuff using chatbot"
      />
      <div className="h-[90vh] py-16 border-2 border-gray-200 rounded m-8">
        <div className="h-full grid grid-cols-2 items-center">
          <TournamentContextProvider idOrSlug={tournamentIdOrSlug}>
            <ChatContextProvider>
              <Chat />
            </ChatContextProvider>
            <TournamentPreview />
          </TournamentContextProvider>
        </div>
      </div>
    </>
  );
}
