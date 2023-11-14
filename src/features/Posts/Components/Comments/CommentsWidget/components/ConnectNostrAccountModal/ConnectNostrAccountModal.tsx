import { motion } from "framer-motion";
import {
  ModalCard,
  modalCardVariants,
} from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { IoClose } from "react-icons/io5";
import Button from "src/Components/Button/Button";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { useState } from "react";
import { NotificationsService } from "src/services";
import { useMyNostrKeysQuery } from "src/graphql";
import CopyToClipboard from "src/Components/CopyToClipboard/CopyToClipboard";
import { utils as secpUtils } from "@noble/secp256k1";
import { getPublicKey, nip19 } from "nostr-tools";
import Skeleton from "react-loading-skeleton";
import { extractErrorMessage } from "src/utils/helperFunctions";
import { PayloadAction } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import { PAGES_ROUTES } from "src/utils/routing";
import { useLinkNostrExtensionKeyToProfile } from "src/features/Profiles/pages/EditProfilePage/NostrSettingsTab/ConnectNostrIdToProfileModal/useLinkNostrKeyToProfile";

export type NostrAccountConnection =
  | {
      type: "nostr-ext";
      pubkey: string;
    }
  | {
      type: "generated-keys";
      pubkey: string;
    }
  | {
      type: "inputted-keys";
      pubkey: string;
      prvkey: string;
    };

interface Props extends ModalCard {
  callbackAction: PayloadAction<{}>;
}

export default function ConnectNostrAccountModal({
  callbackAction,
  onClose,
  direction,
}: Props) {
  const isLoggedIn = useAppSelector((s) => !!s.user.me?.id);

  const myGeneratedKeysQuery = useMyNostrKeysQuery({
    skip: !isLoggedIn,
  });

  const { link: linkNostrExtensionKeyToProfile } =
    useLinkNostrExtensionKeyToProfile();

  const dispatch = useAppDispatch();
  const [prvkeyInput, setPrvkeyInput] = useState("");

  const [linkKeyToMyProfile, setLinkKeyToMyProfile] = useState(true);

  const [activeTab, setActiveTab] =
    useState<"extension" | "generated" | "inputted">("generated");

  const connect = async () => {
    let connectionObject: NostrAccountConnection;
    try {
      if (activeTab === "extension") {
        connectionObject = await connectNostrExtensionToCommentingWidget();

        if (linkKeyToMyProfile) await linkNostrExtensionKeyToProfile();
      } else if (activeTab === "generated")
        connectionObject = await connectGeneratedKeys();
      else if (activeTab === "inputted")
        connectionObject = await connectInputtedKey();
      else throw new Error("Invalid tab");
      localStorage.setItem(
        "nostr-connection",
        JSON.stringify(connectionObject)
      );
      const action = Object.assign({}, callbackAction);
      action.payload = {};
      dispatch(action);
      onClose?.();
    } catch (error) {
      const msg = extractErrorMessage(error);
      if (msg) NotificationsService.error(msg);
      else console.log(error);
    }
  };

  return (
    <motion.div
      custom={direction}
      variants={modalCardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="modal-card !overflow-auto max-w-[522px] rounded-xl relative"
    >
      <div className="p-24">
        <IoClose
          className="absolute text-body2 top-24 right-24 hover:cursor-pointer"
          onClick={onClose}
        />
        <h2 className="text-h5 font-bold text-center">
          Connect your Nostr Account
        </h2>
      </div>
      <hr className="bg-gray-200" />
      <div className="flex flex-col gap-24 p-24">
        <p className="text-body4 text-gray-600">
          Choose how you wish to connect your account:
        </p>

        <ul className="flex flex-wrap rounded border overflow-hidden ">
          <li className="grow first-of-type:border-l-0 border-l">
            <button
              className={`py-12 text-body5 md:text-body4 w-full text-center hover:bg-primary-25 active:text-primary-400 transition-shadow ${
                activeTab === "generated" &&
                "bg-primary-50 shadow-inner text-primary-600"
              }`}
              onClick={() => setActiveTab("generated")}
            >
              Generated Keys
            </button>
          </li>
          <li className="grow first-of-type:border-l-0 border-l">
            <button
              className={`py-12 text-body5 md:text-body4 w-full text-center hover:bg-primary-25 active:text-primary-400 transition-shadow ${
                activeTab === "extension" &&
                "bg-primary-50 shadow-inner text-primary-600"
              }`}
              onClick={() => setActiveTab("extension")}
            >
              Extension
            </button>
          </li>
          <li className="grow first-of-type:border-l-0 border-l">
            <button
              className={`py-12 text-body5 md:text-body4 w-full text-center hover:bg-primary-25 active:text-primary-400 transition-shadow ${
                activeTab === "inputted" &&
                "bg-primary-50 shadow-inner text-primary-600"
              }`}
              onClick={() => setActiveTab("inputted")}
            >
              Enter Manually
            </button>
          </li>
        </ul>

        {activeTab === "generated" && (
          <div className="flex flex-col gap-16">
            <h4 className="text-body3 font-bold text-gray-900">
              Keys Generated by BOLT.FUN
            </h4>
            <div className="text-gray-600 flex flex-col gap-12">
              <p>This is the easiest way to get started.</p>
              <p>
                When you login to your bolt.fun account, we generate a pair of
                private/public keys for you & store them in our Database.
              </p>
              <p>
                Whenever you wist to publish an event later, we sign it
                server-side & give it back to you.
              </p>
            </div>

            {isLoggedIn && (
              <>
                <p className="text-gray-600">
                  You can view your generated keys here in case you want to copy
                  them & use them on other nostr clients
                </p>
                {myGeneratedKeysQuery.loading && (
                  <div className="flex flex-col gap-12">
                    <p className="text-body5 mb-0">
                      <Skeleton width="24ch" />
                    </p>
                    <Skeleton width="100%" height={40} />
                    <p className="text-body5 mb-0">
                      <Skeleton width="24ch" />
                    </p>
                    <Skeleton width="100%" height={40} />
                  </div>
                )}
                {!myGeneratedKeysQuery.loading &&
                  myGeneratedKeysQuery.data?.me && (
                    <div className="flex flex-col gap-8">
                      <div>
                        <p className="text-body5 font-bold">
                          Your Nostr Private Key
                        </p>
                        <div className="input-wrapper mt-8 relative">
                          <input
                            type={"password"}
                            className="input-text"
                            defaultValue={
                              myGeneratedKeysQuery.data?.me.private_data
                                .default_nostr_prv_key!
                            }
                            readOnly
                          />

                          <CopyToClipboard
                            text={
                              myGeneratedKeysQuery.data?.me.private_data
                                .default_nostr_prv_key!
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-body5 font-bold">
                          Your Nostr Public Key
                        </p>
                        <div className="input-wrapper mt-8 relative">
                          <input
                            type="text"
                            className="input-text"
                            defaultValue={
                              myGeneratedKeysQuery.data?.me.private_data
                                .default_nostr_pub_key!!
                            }
                            readOnly
                          />
                          <CopyToClipboard
                            text={
                              myGeneratedKeysQuery.data?.me.private_data
                                .default_nostr_pub_key! ?? ""
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}
                <p className="text-body5 text-gray-600">
                  You can also view these keys later in your profile settings
                  page.
                </p>
              </>
            )}
            {!isLoggedIn && (
              <>
                <p className="text-gray-500 font-bold">
                  You need to{" "}
                  <Link
                    className="underline text-blue-400"
                    to={PAGES_ROUTES.auth.login}
                    state={{ from: window.location.pathname }}
                    onClick={onClose}
                  >
                    login
                  </Link>{" "}
                  to your bolt.fun account first.
                </p>
              </>
            )}
            <Button
              disabled={
                !isLoggedIn ||
                !myGeneratedKeysQuery.data?.me?.private_data
                  .default_nostr_prv_key
              }
              fullWidth
              color="primary"
              className="mt-8"
              onClick={connect}
            >
              Use Generated Keys
            </Button>
          </div>
        )}
        {activeTab === "extension" && (
          <div className="flex flex-col gap-16">
            <h4 className="text-body3 font-bold text-gray-900">
              Use a Nostr Extension{" "}
              <span className="text-gray-400 text-body4 font-regular">
                (Desktop Only 💻)
              </span>{" "}
            </h4>
            <div className="text-gray-600 flex flex-col gap-12">
              <p>
                There are several browser extensions that can take care of
                storing your private key safely & using it to sign your notes on
                demand on different websites.
              </p>
              <p>
                This option is for people who want to have full ownership of
                their keys.
              </p>
              <p>
                Popular extensions include:{" "}
                <a
                  href="https://getalby.com/"
                  className="text-blue-500"
                  target="_blank"
                  rel="noreferrer"
                >
                  Alby
                </a>
                ,{" "}
                <a
                  href="https://github.com/fiatjaf/nos2x"
                  className="text-blue-500"
                  target="_blank"
                  rel="noreferrer"
                >
                  nos2x
                </a>
                ,{" "}
                <a
                  href="https://www.blockcore.net/wallet"
                  className="text-blue-500"
                  target="_blank"
                  rel="noreferrer"
                >
                  Blockcore
                </a>
              </p>
            </div>

            <p className="text-body5 text-gray-600 font-medium">
              *If you are using Alby, make sure to generate a nostr private key
              first in the extension's settings page.
            </p>
            <div className="flex items-center gap-8">
              <input
                id="terms"
                type="checkbox"
                checked={linkKeyToMyProfile}
                onChange={(e) => setLinkKeyToMyProfile(e.target.checked)}
                className="input-checkbox self-center"
              />
              <label htmlFor="terms" className="text-body4 text-gray-600">
                Link key to my profile.
              </label>
            </div>

            <Button
              fullWidth
              color="primary"
              className="mt-8"
              onClick={connect}
            >
              Connect to Extension
            </Button>
          </div>
        )}
        {activeTab === "inputted" && (
          <div className="flex flex-col gap-16">
            <h4 className="text-body3 font-bold text-gray-900">
              Enter Your Private Key
            </h4>
            <p className="text-gray-600">
              This option is{" "}
              <a
                href="https://www.horangi.com/blog/misuse-of-local-storage"
                target="_blank"
                rel="noreferrer"
                className="underline text-blue-400"
              >
                not safe
              </a>{" "}
              & you should try in general to avoid entering your private keys on
              any website if you really care about them.
              <br />
              <br />
              This unsafe option used to exist to allow users to use their
              extension's keys on their mobile devices, where extensions can't
              be used.
              <br />
              <br />
              But hopefully, better and safer solutions like{" "}
              <a
                href="https://github.com/nostr-connect/nostrum"
                target="_blank"
                rel="noreferrer"
                className="underline text-blue-400"
              >
                nostr-connect
              </a>{" "}
              should come out soon and solve the problem!
            </p>

            {/* <div className="input-wrapper mt-8 relative">
              <input
                type={"text"}
                className="input-text"
                value={prvkeyInput}
                onChange={(e) => setPrvkeyInput(e.target.value)}
              />
            </div>
            <Button
              fullWidth
              color="primary"
              className="mt-8"
              onClick={connect}
            >
              Connect Manually
            </Button> */}
          </div>
        )}
      </div>
    </motion.div>
  );

  function connectInputtedKey() {
    if (!isValidPrivateKey(prvkeyInput))
      throw new Error("You need to provide a valid private key");

    const prvkeyHex = prvkeyInput.startsWith("nsec")
      ? (nip19.decode(prvkeyInput).data as string)
      : prvkeyInput;

    const pubkey = getPublicKey(prvkeyHex);
    return {
      type: "inputted-keys",
      pubkey,
      prvkey: prvkeyHex,
    } as NostrAccountConnection;
  }

  function connectGeneratedKeys() {
    const prvKey =
      myGeneratedKeysQuery.data?.me?.private_data.default_nostr_prv_key;
    if (!prvKey) throw new Error("Private key not provided");

    const pubkey = getPublicKey(prvKey);
    return {
      type: "generated-keys",
      pubkey,
    } as NostrAccountConnection;
  }
}

export async function connectNostrExtensionToCommentingWidget() {
  if (window.nostr) {
    try {
      const pubkey = await window.nostr.getPublicKey();
      return {
        type: "nostr-ext",
        pubkey,
      } as NostrAccountConnection;
    } catch (err) {
      throw new Error("Permission to get public key rejected");
    }
  } else {
    throw new Error(
      "Couldn't find a nostr supporting extension in your browser"
    );
  }
}

function isValidPrivateKey(prvKey: string | null | undefined) {
  if (!prvKey) return false;
  const isValidHexKey = secpUtils.isValidPrivateKey(prvKey);
  const isValidBech32Key =
    prvKey.startsWith("nsec") &&
    secpUtils.isValidPrivateKey(nip19.decode(prvKey).data as string);

  // if (isValidBech32Key) console.log(getPublicKey(prvKey));

  return isValidHexKey || isValidBech32Key;
}
