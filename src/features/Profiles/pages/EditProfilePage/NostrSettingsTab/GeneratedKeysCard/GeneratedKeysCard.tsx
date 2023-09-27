import { Nullable } from "remirror";
import CopyToClipboard from "src/Components/CopyToClipboard/CopyToClipboard";
import Card from "src/Components/Card/Card";

interface Props {
  nostr_pub_key: Nullable<string>;
  nostr_prv_key: Nullable<string>;
}

export default function GeneratedKeysCard({
  nostr_prv_key,
  nostr_pub_key,
}: Props) {
  return (
    <Card>
      <p className="text-body2 font-bold">🔐 Your BOLT.FUN's Generated Keys</p>
      <p className="mt-8 text-body4 text-gray-600">
        Using any nostr-powered feature in the website (like commenting)
        requires having a nostr key.
        <br />
        <br />
        You can (and are encouraged) to use your own keys that are stored in
        something like Alby, nos2x,...etc.
        <br />
        <br />
        But for the users who don't want to have to manage their keys & prefer
        the easier way, we generate a default pair of keys and store them in our
        DB for you.
      </p>

      <div className="mt-24 flex flex-col gap-16">
        <p className="text-body3 font-bold">Here are your generated keys</p>
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
