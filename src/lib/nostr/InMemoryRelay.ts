import { Event, Filter, matchFilters } from "nostr-tools";
import { WebSocket, WebSocketServer } from "isomorphic-ws";

const _ = WebSocket; // Importing WebSocket is needed for WebSocketServer to work

export class InMemoryRelayServer {
  events: (Event & { id: string })[] = [];
  auth?: string;
  wss?: WebSocketServer;
  subs: Map<string, Filter[]> = new Map();
  connections: Set<WebSocket> = new Set();
  totalSubscriptions = 0;
  serverStarted = false;

  initServer(port = 8081, host = "localhost") {
    let resolveServerStarted: (v: boolean) => void;

    this.wss = new WebSocketServer({ port, host }, () => {
      resolveServerStarted(true);
    });
    this.wss.on("connection", (ws) => {
      this.connections.add(ws);
      ws.on("message", (message) => {
        const data = JSON.parse(message.toString());
        // console.log('received: %s', JSON.stringify(data))
        if (data && data[0] === "REQ") {
          const sub = data[1];
          const filters = data.slice(2);
          this.totalSubscriptions++;
          this.subs.set(sub, filters);
          for (const event of this.events) {
            if (matchFilters(filters, event)) {
              // console.log('sending event to sub %s', sub, JSON.stringify(['EVENT', sub, event]))
              ws.send(JSON.stringify(["EVENT", sub, event]));
            }
          }
          // console.log('sending eose to sub %s', sub, JSON.stringify(['EOSE', sub]))
          ws.send(JSON.stringify(["EOSE", sub]));
        } else if (data && data[0] === "EVENT") {
          const event = data[1];
          this.events.push(event);
          this.subs.forEach((filters, sub) => {
            if (matchFilters(filters, event)) {
              // console.log('sending event to sub %s', sub, JSON.stringify(['EVENT', sub, event]))
              ws.send(JSON.stringify(["EVENT", sub, event]));
            }
          });
        } else if (data && data[0] === "CLOSE") {
          const sub = data[1];
          this.subs.delete(sub);
        }
      });
      if (this.auth) {
        ws.send(JSON.stringify(["AUTH", this.auth]));
      }
    });

    return new Promise((resolve) => {
      resolveServerStarted = resolve;
    });
  }

  async close(): Promise<void> {
    if (!this.wss) throw new Error("Server not started");

    new Promise((resolve) => this.wss!.close(resolve));
  }

  initEvents(events: typeof this["events"]) {
    this.events = events;
  }

  clear() {
    this.events = [];
    this.subs = new Map();
    this.totalSubscriptions = 0;
    this.auth = undefined;
  }
  disconnectAll() {
    this.connections.forEach((ws) => {
      ws.close();
    });
  }
}
