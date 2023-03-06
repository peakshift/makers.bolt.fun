import { useToggle } from "@react-hookz/web";
import { FaChevronDown } from "react-icons/fa";
import { Nullable } from "remirror";
import Button from "src/Components/Button/Button";
import CopyToClipboard from "src/Components/CopyToClipboard/CopyToClipboard";
import IconButton from "src/Components/IconButton/IconButton";
import { CONSTS } from "src/utils";
import { motion } from "framer-motion";
import Card from "src/Components/Card/Card";
import Preferences from "src/services/preferences.service";
import RelaysList from "src/features/Posts/Components/Comments/CommentsWidget/components/RelaysList/RelaysList";

interface Props {
  nostr_pub_key: Nullable<string>;
  nostr_prv_key: Nullable<string>;
}

export default function CommentsSettingsCard({
  nostr_prv_key,
  nostr_pub_key,
}: Props) {
  const [relaysDropdownOpen, toggleRelaysDropdownOpen] = useToggle(true);

  return (
    <Card>
      <p className="text-body2 font-bold">
        💬 Nostr Settings{" "}
        <span className="bg-green-50 text-green-500 text-body5 font-medium py-4 px-12 rounded-48 ml-8">
          Experimental
        </span>
      </p>
      <p className="mt-8 text-body4 text-gray-600">
        Our commenting system is experimental and uses Nostr to store and
        publish your messages and replies to our own relay, as well as relays
        ran by other people in the community.
        <br />
        You can use your own Nostr keys using something like Alby or nos2x, or
        you can use keys generated by us & stored in our DB, it's up to you.
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

      {/* <p className="text-body4 font-bold mt-24">
                Connect your Nostr identity
            </p>
            <div className="mt-8 py-12 relative">
                <p className="text-body4 text-gray-400 font-bold">
                    🚧 Coming Soon 🚧
                </p>
            </div> */}
      <div className="mt-24">
        <div className="flex justify-between">
          <p className="text-body4 font-bold">The relays you connect to</p>
          <IconButton onClick={() => toggleRelaysDropdownOpen()}>
            <motion.div animate={{ rotate: relaysDropdownOpen ? 180 : 0 }}>
              <FaChevronDown />
            </motion.div>
          </IconButton>
        </div>
        {relaysDropdownOpen && <RelaysList />}
      </div>
    </Card>
  );
}