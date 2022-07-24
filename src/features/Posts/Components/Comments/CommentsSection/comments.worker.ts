import debounce from 'lodash.debounce';
import { relayPool } from 'nostr-tools'
import { Nullable } from 'remirror';
import { CONSTS } from 'src/utils';
import { Comment } from '../types';

type Author = NonNullable<Comment['author']>


const pool = relayPool();

const RELAYS = [
    'wss://nostr.drss.io',
    'wss://nostr-relay.freeberty.net',
    'wss://nostr.unknown.place',
    'wss://nostr-relay.untethr.me',
    'wss://relay.damus.io'
];

export function connect() {
    RELAYS.forEach(url => {
        pool.addRelay(url, { read: true, write: true })
    })
    pool.onNotice((notice: string, relay: any) => {
        console.log(`${relay.url} says: ${notice}`)
    })
};

let events: Record<string, Required<NostrEvent>> = {};

export function sub(filter: string, cb: (data: Comment[]) => void) {

    const reconstructTree = debounce(async () => {
        const newComments = await constructTree();
        cb(newComments)
    }, 1000)

    let sub = pool.sub({
        filter: {
            "#r": [filter]
        },
        cb: async (event: Required<NostrEvent>) => {
            //Got a new event 
            if (!event.id) return;

            if (event.id in events) return
            events[event.id] = event

            reconstructTree()
        }
    });

    return () => {
        sub.unsub();
        events = {};
    };
}

async function getSignedEvents(event: any) {
    const res = await fetch(CONSTS.apiEndpoint + '/sign-event', {
        method: "post",
        body: JSON.stringify({ event }),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const data = await res.json()
    return data.event;
}

async function mapPubkeysToUsers(pubkeys: string[]) {
    const res = await fetch(CONSTS.apiEndpoint + '/pubkeys-to-users', {
        method: "post",
        body: JSON.stringify({ pubkeys }),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const data = await res.json()
    return data.pubkeysToUsers as Record<string, Author>;
}


export async function post({ content, filter, parentId }: {
    content: string,
    filter: string,
    parentId?: string
}) {

    const tags = [];
    tags.push(['r', filter]);
    if (parentId)
        tags.push(['e', `${parentId} ${RELAYS[0]} reply`])

    let event: NostrEvent;
    try {
        event = await getSignedEvents({
            // pubkey: globalKeys.pubkey,
            // created_at: Math.round(Date.now() / 1000),
            kind: 1,
            tags,
            content,
        }) as NostrEvent;
    } catch (error) {
        alert("Couldn't sign the object successfully...")
        return;
    }



    const publishTimeout = setTimeout(() => {
        alert(
            `failed to publish comment to any relay.`
        );
    }, 5000)

    pool.publish(event, (status: number, relay: string) => {
        switch (status) {
            case -1:
                console.log(`failed to send ${JSON.stringify(event)} to ${relay}`)
                // enable()
                // onError()
                break
            case 1:
                clearTimeout(publishTimeout)
                console.log(`event ${event.id?.slice(0, 5)}… published to ${relay}.`)
                // onSuccess()
                break
        }
    })
}

function extractParentId(event: NostrEvent): Nullable<string> {

    for (const [identifier, value] of event.tags) {
        if (identifier === 'e') {
            const [eventId, , marker] = value.split(' ');
            if (marker === 'reply') return eventId;
        }
    }
    return null;
}

export async function constructTree() {
    // This function is responsible for transforming the object shaped events into a tree of comments
    // ----------------------------------------------------------------------------------------------

    // Sort them chronologically from oldest to newest
    let sortedEvenets = Object.values(events).sort((a, b) => a.created_at - b.created_at);



    // Extract the pubkeys used
    const pubkeysSet = new Set<string>();
    sortedEvenets.forEach(e => pubkeysSet.add(e.pubkey));


    // Make a request to api to get the pubkeys' users' data
    const pubkeyToUser = await mapPubkeysToUsers(Array.from(pubkeysSet.values())) as Record<string, Author>;

    let eventsTree: Record<string, Comment> = {}
    // If event is a reply, connect it to parent
    sortedEvenets.forEach(e => {
        const parentId = extractParentId(e);

        if (parentId) {
            eventsTree[parentId]?.replies.push({
                id: e.id,
                body: e.content,
                created_at: e.created_at * 1000,
                pubkey: e.pubkey,
                author: pubkeyToUser[e.pubkey],
                replies: [],
            });
        } else {
            eventsTree[e.id] = ({
                id: e.id,
                body: e.content,
                created_at: e.created_at * 1000,
                pubkey: e.pubkey,
                author: pubkeyToUser[e.pubkey],
                replies: [],
            });
        }
    })

    // Run the censoring service
    // (nothing for now -:-)

    // Turn the top roots replies into a sorted array
    const sortedTree = Object.values(eventsTree).sort((a, b) => b.created_at - a.created_at)
    // Publish the new tree.
    return sortedTree;

}