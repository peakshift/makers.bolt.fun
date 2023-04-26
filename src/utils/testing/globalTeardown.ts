import { InMemoryRelayServer } from "../../lib/nostr/tests/InMemoryRelay";

export default async function globalTeardown(
  globalConfig: any,
  projectConfig: any
) {
  // @ts-ignore
  const relaysServers = globalThis.relaysServers as InMemoryRelayServer[];

  if (typeof relaysServers === "object" && Array.isArray(relaysServers)) {
    const promises = (relaysServers as InMemoryRelayServer[]).map((s) =>
      s.close()
    );
    await Promise.all(promises);
  }
}
