import CommentsWidgetRoot from "src/features/Posts/Components/Comments/CommentsWidget/CommentsWidgetRoot";
import { RelayPoolProvider } from "src/lib/nostr";
import { withProviders } from "src/utils/hoc";

function IdeasPage() {
  return (
    <div className="pb-42">
      <h2 className="text-body1 font-bolder text-gray-900">Ideas</h2>
      <p className="text-body3 text-gray-500 mt-8">
        Do you have any ideas for a project that you think is important to the
        ecosystem and you would like for someone to think about and work on it??
        <br />
        <br />
        Or are you looking for interesting ideas to work on??
      </p>
      {/* <div className="flex gap-24 justify-between">
                <h2 className='text-body1 font-bolder text-gray-900 mb-24'>Events 📆 ({events_count})</h2>
                <Button size='sm' variant='text' href='https://airtable.com/shrjVx8MjLfl8zyXD' color='gray' newTab className='ml-auto'>List an event</Button>
            </div> */}
      <CommentsWidgetRoot
        story={{
          nostr_event_id:
            "4cc8cb708b575c465962cb099bf8b1b2705edfc303613bc30e06c0dd47d08d2f",
          createdAt: "1678182736",
        }}
        inputPlaceholder="Share your ideas"
        hideTitle
        hideProfileSettingsBtn
      />
    </div>
  );
}

export default withProviders(RelayPoolProvider)(IdeasPage);
