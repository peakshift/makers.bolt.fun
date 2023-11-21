import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { User } from "src/graphql";
import {
  extractErrorMessage,
  trimText,
  withHttp,
} from "src/utils/helperFunctions";
import {
  FiCopy,
  FiGithub,
  FiGlobe,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";
import Button from "src/Components/Button/Button";
import Card from "src/Components/Card/Card";
import { FaDiscord } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { NotificationsService } from "src/services/notifications.service";
import { nip19 } from "nostr-tools";
import { useMetaData } from "src/lib/nostr";
import { getProfileDataFromMetaData } from "src/lib/nostr/helpers";
import IconButton from "src/Components/IconButton/IconButton";
import { Wallet_Service } from "src/services";
import Badge from "src/Components/Badge/Badge";

interface Props {
  isOwner?: boolean;
  user: Pick<
    User,
    | "name"
    | "lightning_address"
    | "jobTitle"
    | "avatar"
    | "website"
    | "discord"
    | "github"
    | "twitter"
    | "linkedin"
    | "location"
    | "bio"
    | "nostr_keys"
  >;
}

export default function AboutCard({ user, isOwner }: Props) {
  const { metadata } = useMetaData({
    pubkeys: user.nostr_keys.map((k) => k.key),
  });

  const links = [
    {
      value: user.discord,
      text: user.discord,
      icon: FaDiscord,
      colors: "bg-violet-100 text-violet-900",
    },
    {
      value: user.website,
      text: user.website?.replace(/(^\w+:|^)\/\//, "").replace(/\/$/, ""),
      icon: FiGlobe,
      colors: "bg-gray-100 text-gray-900",
      url: user.website && withHttp(user.website),
    },
    {
      value: user.twitter,
      text: user.twitter,
      icon: FiTwitter,
      colors: "bg-blue-100 text-blue-500",
      url: `https://twitter.com/${user.twitter}`,
    },
    {
      value: user.github,
      text: user.github,
      icon: FiGithub,
      colors: "bg-pink-100 text-pink-600",
      url: `https://github.com/${user.github}`,
    },
    {
      value: user.linkedin,
      text: "LinkedIn",
      icon: FiLinkedin,
      colors: "bg-sky-100 text-cyan-600",
      url: user.linkedin && withHttp(user.linkedin),
    },
  ];

  const onTipLightningAddress = async () => {
    try {
      const webln = await Wallet_Service.getWebln();

      if (!webln) throw new Error("No WebLN provider found");

      const lnaddress = user.lightning_address!;
      const [username, host] = lnaddress.split("@");

      const url = `https://${host}/.well-known/lnurlp/${username}`;
      const response = await fetch(url);
      const lnurlDetails = await response.json();

      const callback = new URL(lnurlDetails.callback);
      const amount = 100 * 1000; // lnurl-pay requires milli-sats
      callback.searchParams.set("amount", amount.toString());

      const callbackResponse = await fetch(callback.toString());
      const prDetails = await callbackResponse.json();

      let paymentResponse = await webln.sendPayment(prDetails.pr);
      if (paymentResponse.preimage) {
        NotificationsService.success(
          `Tipped ${trimText(user.name, 10)} 100 Sats!`
        );
      }
    } catch (error) {
      console.log(error);
      NotificationsService.error(
        extractErrorMessage(error) ?? "Something went wrong"
      );
    }
  };

  return (
    <Card defaultPadding={false}>
      <div className="bg-gray-600 relative h-[160px] rounded-t-16">
        <div className="absolute left-24 bottom-0 translate-y-1/2">
          <Avatar src={user.avatar} width={120} />
        </div>
      </div>
      <div className="h-64 flex justify-end items-center px-24">
        {isOwner && (
          <Button size="sm" color="gray" href="/edit-profile">
            Edit Profile ⚙️
          </Button>
        )}
      </div>
      <div className="p-24 pt-0">
        <div className="flex flex-col gap-16">
          <div>
            <h1 className="text-h2 font-bolder overflow-hidden text-ellipsis">
              {user.name}
            </h1>

            {
              <p className="text-body3 font-medium text-gray-600">
                {user.jobTitle ? user.jobTitle : "No job title added"}
              </p>
            }
          </div>
          {
            <div className="flex flex-wrap gap-16">
              {links
                .filter((link) => !!link.value || isOwner)
                .map((link, idx) =>
                  !!link.value ? (
                    link.url ? (
                      <a
                        key={idx}
                        href={link.url!}
                        className={`w-40 aspect-square rounded-full flex justify-center items-center ${link.colors}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <link.icon className="scale-125" />
                      </a>
                    ) : (
                      <CopyToClipboard
                        key={idx}
                        text={link.value}
                        onCopy={() =>
                          NotificationsService.info(" Copied to clipboard", {
                            icon: "📋",
                          })
                        }
                      >
                        <button
                          onClick={() => {}}
                          className={`w-40 aspect-square rounded-full flex justify-center items-center ${link.colors}`}
                        >
                          <link.icon className="scale-125" />
                        </button>
                      </CopyToClipboard>
                    )
                  ) : (
                    isOwner && (
                      <p
                        key={idx}
                        className={`text-body4 py-8 px-16 rounded-24 font-medium ${link.colors}`}
                      >
                        <link.icon className="scale-125 mr-8" />{" "}
                        <span className="align-middle">---</span>
                      </p>
                    )
                  )
                )}
            </div>
          }

          {
            <button
              onClick={onTipLightningAddress}
              className="text-body5 bg-amber-100 hover:bg-amber-200  self-start px-16 py-8 rounded font-medium"
            >
              {user.lightning_address
                ? `⚡${user.lightning_address}`
                : "⚡ No lightning address"}
            </button>
          }

          {
            <p className="text-body4 font-normal">
              {user.bio ? user.bio : "No bio added"}
            </p>
          }

          {user.nostr_keys.length > 0 && (
            <div>
              <p className="text-gray-400 text-body5 mb-8 mt-16 uppercase">
                Nostr
              </p>
              <ul className="flex flex-col gap-12">
                {[...user.nostr_keys]
                  .sort((k1, k2) => (k1.is_primary ? -1 : 1))
                  .filter((k) => k.is_primary)
                  .map((nostrKey) => {
                    const nostrProfile = getProfileDataFromMetaData(
                      metadata,
                      nostrKey.key
                    );
                    return (
                      <li
                        key={nostrKey.key}
                        className="bg-gray-100 rounded p-16 flex gap-12 items-center justify-between"
                      >
                        <div className="flex gap-8 items-center min-w-0">
                          <Avatar width={32} src={nostrProfile.image} />
                          <div className="overflow-hidden">
                            <p className="font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                              {nostrKey.is_primary && (
                                <Badge size="sm" color="black" className="mr-8">
                                  Primary Key
                                </Badge>
                              )}
                              {nostrProfile.name}
                            </p>
                            <a
                              href={`https://nostr.guru/p/${nostrKey.key}`}
                              className="block hover:underline text-gray-500 overflow-hidden text-ellipsis"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {nip19.npubEncode(nostrKey.key)}
                            </a>
                          </div>
                          <span className="relative">
                            <CopyToClipboard
                              text={nip19.npubEncode(nostrKey.key)}
                              onCopy={() =>
                                NotificationsService.info(
                                  " Copied to clipboard",
                                  {
                                    icon: "📋",
                                  }
                                )
                              }
                            >
                              <IconButton className="text-primary-500">
                                <FiCopy />
                              </IconButton>
                            </CopyToClipboard>
                          </span>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
