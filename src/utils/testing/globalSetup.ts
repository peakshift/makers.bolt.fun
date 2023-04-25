import { InMemoryRelayServer } from "../../lib/nostr/tests/InMemoryRelay";

export default async function globalSetup(
  globalConfig: any,
  projectConfig: any
) {
  const _relayServer1 = new InMemoryRelayServer(8083);
  const _relayServer2 = new InMemoryRelayServer(8084);

  await Promise.all([
    _relayServer1.waitForServerToStart(),
    _relayServer2.waitForServerToStart(),
  ]);
  // @ts-ignore
  globalThis.relaysServers = [_relayServer1, _relayServer2];
}
