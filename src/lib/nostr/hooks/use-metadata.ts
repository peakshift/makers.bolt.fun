import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
  useMemo,
} from "react";
import { useRelayPool } from "./use-relays-pool";
import { nip05 } from "nostr-tools";
import { NostrKeysMetadataDocument, NostrKeysMetadataQuery } from "src/graphql";
import { getProfileDataFromMetaData } from "../helpers";
import { NostrEvent, NostrProfile } from "../types";
import { useApolloClient } from "@apollo/client";

export const useMetaData = ({ pubkeys }: { pubkeys: string[] }) => {
  const { relayPool } = useRelayPool();

  const [nostrMetadata, setNostrMetadata] = useState<
    Record<string, NostrEvent>
  >({});

  const [usersDataFromApi, setUsersDataFromApi] = useState<
    Record<string, NostrKeysMetadataQuery["usersByNostrKeys"][number]["user"]>
  >({});

  const apolloClient = useApolloClient();

  const profilesData = useMemo(() => {
    let result: Record<string, NostrProfile> = {};
    for (let i = 0; i < pubkeys.length; i++) {
      const pubkey = pubkeys[i];
      if (result[pubkey]) continue;

      const userDataFromAPI = usersDataFromApi[pubkey];
      const userDataFromNostr = getProfileDataFromMetaData(
        nostrMetadata,
        pubkey
      );

      result[pubkey] = {
        ...userDataFromNostr,
        image: userDataFromAPI?.avatar ?? userDataFromNostr.image,
        name: userDataFromAPI?.name ?? userDataFromNostr.name,
        boltfun_id: userDataFromAPI?.id,
      };
    }
    return result;
  }, [nostrMetadata, pubkeys, usersDataFromApi]);

  const metadataFetching = useRef<Record<string, boolean>>({});

  const nostrMetadataRef = useRef<typeof nostrMetadata>({});

  useLayoutEffect(() => {
    nostrMetadataRef.current = nostrMetadata;
  }, [nostrMetadata]);

  const fetchMetadata = useCallback(
    async function (pubkeys: string[]) {
      const nostrMetadata = nostrMetadataRef.current;

      if (!relayPool) throw new Error("Relays Pool not initialized yet");

      const relaysUrls = Array.from(relayPool.relayByUrl.keys());

      const unsub = relayPool.subscribe(
        [{ kinds: [0], authors: pubkeys }],
        relaysUrls,
        (event) => {
          try {
            if (
              !nostrMetadata[event.pubkey] ||
              nostrMetadata[event.pubkey].created_at < event.created_at
            ) {
              const metaData = {
                ...JSON.parse(event.content),
                created_at: event.created_at,
              };
              setNostrMetadata((curr) => ({
                ...curr,
                [event.pubkey]: metaData,
              }));
              fetchNIP05(event.pubkey, metaData);
            }
          } catch (err) {
            /***/
          }
        },
        200
      );

      setTimeout(() => unsub(), 20000);
    },
    [relayPool]
  );

  useEffect(() => {
    if (relayPool && pubkeys.length > 0) {
      let pubkeysToFetch = Array.from(
        new Set(
          pubkeys.filter(
            (k) =>
              !(k in nostrMetadataRef.current || k in metadataFetching.current)
          )
        )
      );

      if (pubkeysToFetch.length === 0) return;

      pubkeysToFetch.forEach((k) => (metadataFetching.current[k] = true));

      fetchMetadata(pubkeysToFetch);

      apolloClient
        .query<NostrKeysMetadataQuery>({
          query: NostrKeysMetadataDocument,
          variables: { keys: pubkeysToFetch },
        })
        .then(({ data }) => {
          if (data) {
            const newEntries = data.usersByNostrKeys.reduce(
              (acc, cur) => ({ ...acc, [cur.key]: cur.user }),
              {}
            );
            setUsersDataFromApi((curr) => ({ ...curr, ...newEntries }));
          }
        });
    }
  }, [apolloClient, fetchMetadata, pubkeys, relayPool]);

  async function fetchNIP05(pubkey: string, meta: any) {
    if (meta && meta.nip05)
      nip05
        .queryProfile(meta.nip05)
        .then((name) => {
          if (name === meta.nip05) {
            setNostrMetadata((curr) => ({
              ...curr,
              [pubkey]: { ...meta, nip05verified: true },
            }));
          }
        })
        .catch((err) => {
          console.log("Error while quering nip5 profile");
          console.log(err);
        });
  }

  return { profilesData, metadata: nostrMetadata, fetchMetadata };
};
