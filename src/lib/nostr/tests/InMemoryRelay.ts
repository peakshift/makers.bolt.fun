import { Event, Filter, matchFilters } from "nostr-tools";
import { WebSocket, WebSocketServer } from "isomorphic-ws";

const _ = WebSocket; // Importing WebSocket is needed for WebSocketServer to work

export class InMemoryRelayServer {
  events: Record<string, Event[]> = {};
  auth?: string;
  wss: WebSocketServer;
  subs: Record<string, Map<string, Filter[]>> = {};
  connections: Set<WebSocket> = new Set();
  totalSubscriptions = 0;
  serverStarted = false;

  constructor(port = 8081, host = "localhost") {
    this.wss = new WebSocketServer({ port, host });

    this.wss.addListener("listening", () => {
      this.serverStarted = true;
    });

    this.wss.on("connection", (ws, req) => {
      let thisConnectionBucket = "global";
      if (req.url) {
        const _bucket = req.url.match(/bucket=([^&]+)/)?.[1];
        if (_bucket) thisConnectionBucket = _bucket;
      }

      if (!this.events[thisConnectionBucket])
        this.events[thisConnectionBucket] = [];
      if (!this.subs[thisConnectionBucket])
        this.subs[thisConnectionBucket] = new Map();

      this.connections.add(ws);

      ws.on("message", (message) => {
        try {
          const data = JSON.parse(message.toString());

          // console.log("received: %s", JSON.stringify(data));
          if (data && data[0] === "REQ") {
            const sub = data[1];
            const filters = data.slice(2);
            this.totalSubscriptions++;
            this.subs[thisConnectionBucket].set(sub, filters);
            for (const event of this.events[thisConnectionBucket]) {
              if (matchFilters(filters, event)) {
                // console.log('sending event to sub %s', sub, JSON.stringify(['EVENT', sub, event]))
                ws.send(JSON.stringify(["EVENT", sub, event]));
              }
            }
            // console.log('sending eose to sub %s', sub, JSON.stringify(['EOSE', sub]))
            ws.send(JSON.stringify(["EOSE", sub]));
          } else if (data && data[0] === "EVENT") {
            const event = data[1];
            if (!this.events[thisConnectionBucket])
              this.events[thisConnectionBucket] = [];
            this.events[thisConnectionBucket].push(event);
            this.subs[thisConnectionBucket].forEach((filters, sub) => {
              if (matchFilters(filters, event)) {
                // console.log('sending event to sub %s', sub, JSON.stringify(['EVENT', sub, event]))
                ws.send(JSON.stringify(["EVENT", sub, event]));
              }
            });
          } else if (data && data[0] === "CLOSE") {
            const sub = data[1];
            this.subs[thisConnectionBucket].delete(sub);
          } else if (data && data[0] === "INIT_DATA") {
            this.events[thisConnectionBucket] = data[1];
          } else if (data && data[0] === "CLEAR_DATA") {
            this.events[thisConnectionBucket] = [];
            this.subs[thisConnectionBucket] = new Map();
          }
        } catch (error) {
          console.log(
            "Error parsing message content, message string: ",
            message.toString()
          );
          return;
        }
      });
      if (this.auth) {
        ws.send(JSON.stringify(["AUTH", this.auth]));
      }
    });
  }

  waitForServerToStart() {
    const ws = this.wss;
    if (!ws) throw new Error("Server not started");

    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this.serverStarted) {
          resolve(true);
          clearInterval(interval);
        }
      }, 5);
    });
  }

  async close() {
    if (this.wss === undefined) throw new Error("Server not started");

    return new Promise((resolve) => this.wss!.close(resolve));
    // return WebSocketServersManager.close(this._port, this._host);
  }

  clear() {
    this.totalSubscriptions = 0;
    this.auth = undefined;
  }
  disconnectAll() {
    this.connections.forEach((ws) => {
      ws.close();
    });
  }
}

export class MockRelayInitializer {
  ws: WebSocket;

  constructor(port: number, bucketId: string) {
    this.ws = new WebSocket(`ws://localhost:${port}/?bucket=${bucketId}`);
  }

  waitForSocketToStart() {
    const ws = this.ws;
    if (!ws) throw new Error("WS client not initialized");
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (ws.readyState === ws.OPEN) {
          resolve(true);
          clearInterval(interval);
        }
      }, 5);
    });
  }

  setRelayEvents(data: Event[]) {
    if (!this.ws) throw new Error("WS client not initialized");
    return new Promise((resolve, reject) => {
      this.ws!.send(JSON.stringify(["INIT_DATA", data]), (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
  clearRelayEvents() {
    if (!this.ws) throw new Error("WS client not initialized");
    return new Promise((resolve, reject) => {
      this.ws!.send(JSON.stringify(["CLEAR_DATA"]), (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
}
