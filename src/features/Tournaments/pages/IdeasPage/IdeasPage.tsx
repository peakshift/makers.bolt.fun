import CommentsWidgetRoot from "src/features/Posts/Components/Comments/CommentsWidget/CommentsWidgetRoot";
import { RelayPoolProvider } from "src/lib/nostr";
import { withProviders } from "src/utils/hoc";
import { useTournament } from "../TournamentDetailsPage/TournamentDetailsContext";

function IdeasPage() {
  const {
    staticData: {
      config: { ideasRootNostrEventId },
    },
  } = useTournament();
  return (
    <div className="pb-42">
      <h2 className="text-body1 font-bolder text-gray-900">Free Ideas!!</h2>
      <p className="text-body3 text-gray-600 mt-8">
        If you are looking for ideas to work on, or if you have an idea you
        would like to see someone working on, this is the place for you!! 🚀
      </p>
      <CommentsWidgetRoot
        story={{
          nostr_event_id: ideasRootNostrEventId!,
          createdAt: "1678182736",
        }}
        inputPlaceholder="Descripe your idea in details"
        hideTitle
        hideProfileSettingsBtn
      />
    </div>
  );
}

export default withProviders(RelayPoolProvider)(IdeasPage);
