import OgTags from "src/Components/OgTags/OgTags";
import Chat from "./components/Chat";
import { useGetTournamentByIdQuery } from "src/graphql";
import { ChatContextProvider } from "./contexts/chat.context";

export default function HangoutPage() {
  const { data, loading } = useGetTournamentByIdQuery({
    variables: {
      idOrSlug: "nostr-hack",
    },
  });

  return (
    <>
      <OgTags
        title="Chatbot Commander"
        description="Update stuff using chatbot"
      />
      <div className="h-[90vh] pt-16 border-2 border-gray-200 rounded m-8">
        <div className="h-full grid grid-cols-2 items-center">
          <ChatContextProvider currentTournament={data?.getTournamentById}>
            <Chat />
          </ChatContextProvider>
          <div className="overflow-y-auto h-full">
            {loading && <p>Loading...</p>}
            {data && (
              <pre className="whitespace-pre-wrap ">
                {JSON.stringify(data.getTournamentById, null, "\t")}
              </pre>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
