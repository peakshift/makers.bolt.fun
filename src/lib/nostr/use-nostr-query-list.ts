import { Filter, nip05 } from "nostr-tools";
import { useCallback, useEffect, useRef, useState } from "react";
import { insertEventIntoDescendingList } from "src/lib/nostr/helpers";
import { useDebounce } from "use-debounce";
import { NostrEvent, NostrMetadata } from "./types";
import { useRelayPool } from "./use-relays-pool";

interface Props {
  filters: Filter[];
  publicKey?: string;
  sortEvents?: boolean;
  timeout?: number;
  shouldFetchMetadata?: boolean;
}

export const useNostrQueryList = (props: Props) => {
  const { relayPool } = useRelayPool();

  const [eventsImmediate, setEvents] = useState<NostrEvent[]>([]);
  const [events] = useDebounce(eventsImmediate, 1000);

  const [metadata, setMetadata] = useState<NostrMetadata>({});
  const metadataFetching = useRef<Record<string, boolean>>({});

  const [isEmpty, setIsEmpty] = useState(false);

  const fetchMetaDataRef = useRef<typeof fetchMetadata>(null!);
  fetchMetaDataRef.current = fetchMetadata;

  useEffect(
    function subscribeToEvents() {
      if (!relayPool) return;

      const relaysUrls = Array.from(relayPool.relayByUrl.keys());

      let unsub = relayPool.subscribe(
        props.filters,
        relaysUrls,
        // onEvent:
        (event, isAfterEose, relayURL) => {
          setEvents((events) =>
            props.sortEvents
              ? insertEventIntoDescendingList(events, event)
              : [...events, event]
          );
        },
        undefined, // maxDelayMs
        // onEose:
        (events, relayURL) => {
          // console.log("EOSE");
        }
      );

      relayPool.onerror((relayUrl, err) => {
        console.log("RelayPool error", err, " from relay ", relayUrl);
      });
      relayPool.onnotice((relayUrl, notice) => {
        console.log("RelayPool notice", notice, " from relay ", relayUrl);
      });

      return () => {
        unsub();
      };
    },
    [props.filters, props.sortEvents, relayPool]
  );

  useEffect(() => {
    if (props.shouldFetchMetadata && relayPool && events.length > 0)
      fetchMetaDataRef.current(events.map((e) => e.pubkey));
  }, [events, props.shouldFetchMetadata, relayPool]);

  useEffect(() => {
    if (props.shouldFetchMetadata && relayPool && props.publicKey)
      fetchMetaDataRef.current([props.publicKey]);
  }, [props.shouldFetchMetadata, props.publicKey, relayPool]);

  useEffect(() => {
    if (events.length === 0) {
      const timeout = setTimeout(() => {
        setIsEmpty(true);
      }, props.timeout ?? 10000);
      return () => clearTimeout(timeout);
    }
    setIsEmpty(false);
  }, [events.length, props.timeout]);

  async function fetchMetadata(
    pubkeys: string[],
    options?: { skip_existing_keys?: boolean }
  ) {
    if (!relayPool) throw new Error("Relays Pool not initialized yet");

    const { skip_existing_keys = true } = options ?? {};

    let pubkeysToFetch = skip_existing_keys
      ? Array.from(
          new Set(
            pubkeys.filter(
              (k) => !(k in metadata || k in metadataFetching.current)
            )
          )
        )
      : pubkeys;

    pubkeysToFetch.forEach((k) => (metadataFetching.current[k] = true));

    const relaysUrls = Array.from(relayPool.relayByUrl.keys());

    const unsub = relayPool.subscribe(
      [{ kinds: [0], authors: pubkeysToFetch }],
      relaysUrls,
      (event) => {
        try {
          if (
            !metadata[event.pubkey] ||
            metadata[event.pubkey].created_at < event.created_at
          ) {
            const metaData = {
              ...JSON.parse(event.content),
              created_at: event.created_at,
            };
            setMetadata((curr) => ({
              ...curr,
              [event.pubkey]: metaData,
            }));
            fetchNIP05(event.pubkey, metaData);
          }
        } catch (err) {
          /***/
        }
      }
    );

    setTimeout(() => unsub(), props.timeout ?? 10000);
  }

  async function fetchNIP05(pubkey: string, meta: any) {
    if (meta && meta.nip05)
      nip05
        .queryProfile(meta.nip05)
        .then((name) => {
          if (name === meta.nip05) {
            setMetadata((curr) => ({
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

  const getRelayUrls = useCallback(
    () => Array.from(relayPool?.relayByUrl.keys() ?? []),
    [relayPool?.relayByUrl]
  );

  return {
    isEmpty,
    relayPool,
    events,
    metadata,
  };
};
