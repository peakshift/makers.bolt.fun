import { RelayPool } from "nostr-relaypool";

export class GlobalRelayPool {
  static pool: RelayPool | undefined;
  static closeTimeout: NodeJS.Timeout | undefined;

  static initPool(...params: ConstructorParameters<typeof RelayPool>) {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = undefined;
    }
    if (this.pool) return this.pool;
    return (this.pool = new RelayPool(...params));
  }

  static closeAfterDelay(delay = 5000) {
    if (!this.closeTimeout)
      this.closeTimeout = setTimeout(() => {
        this.pool?.close();
        this.pool = undefined;
        this.closeTimeout = undefined;
      }, delay);
  }
}
