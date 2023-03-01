import { Nullable } from "remirror";
import CopyToClipboard from "src/Components/CopyToClipboard/CopyToClipboard";
import Card from "src/Components/Card/Card";

interface Props {
  nostr_pub_key: Nullable<string>;
  nostr_prv_key: Nullable<string>;
}

export default function CommentsSettingsCard({
  nostr_prv_key,
  nostr_pub_key,
}: Props) {
  return (
    <Card>
      <p className="text-body2 font-bold">🔐 Your Bolt.Fun Generated Keys</p>
      <p className="mt-8 text-body4 text-gray-600">
        To be able to use our nostr-powered features (like comments), you need
        to have a nostr key.
        <br />
        You can of course use your own keys that are stored in Alby,
        nos2x,...etc.
        <br />
        But in case you don't want to be responsible for managing your keys, we
        generate a pair of keys for you & store them in our DB.
      </p>

      <div className="mt-24 flex flex-col gap-16">
        <p className="text-body3 font-bold">The keys we generated for you</p>
        {nostr_prv_key && (
          <div>
            <p className="text-body5 font-bold">Your Nostr Private Key</p>
            <div className="input-wrapper mt-8 relative">
              <input
                type={"password"}
                className="input-text"
                defaultValue={nostr_prv_key}
                readOnly
              />

              <CopyToClipboard text={nostr_prv_key} />
            </div>
          </div>
        )}
        <div>
          <p className="text-body5 font-bold">Your Nostr Public Key</p>
          <div className="input-wrapper mt-8 relative">
            <input
              type="text"
              className="input-text"
              defaultValue={nostr_pub_key!}
              readOnly
            />
            <CopyToClipboard text={nostr_pub_key ?? ""} />
          </div>
        </div>
      </div>
    </Card>
  );
}
