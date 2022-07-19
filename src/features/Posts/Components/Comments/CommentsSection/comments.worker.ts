import dayjs from 'dayjs'

import { relayPool } from 'nostr-tools'
import { Nullable } from 'remirror';
import { CONSTS } from 'src/utils';
import { mapPubkeysToUsers, } from './comment.server';


const pool = relayPool()

export function now(prefix: string) {
    const hell = window.localStorage.getItem('test');
    if (!hell) window.localStorage.setItem('test', 'test');
    return hell + prefix + dayjs()
};

export function connect() {
    const RELAYS = [
        'wss://rsslay.fiatjaf.com',
        'wss://nostr-pub.wellorder.net',
        'wss://expensive-relay.fiatjaf.com',
        'wss://nostr.bitcoiner.social',
        'wss://relayer.fiatjaf.com',
        'wss://nostr.rocks'
    ];
    RELAYS.forEach(url => {
        pool.addRelay(url, { read: true, write: true })
    })
};

const events: Record<string, Required<NostrEvent>> = {};

export function sub(filter: any) {
    let sub = pool.sub({
        filter,
        cb: (event: Required<NostrEvent>) => {
            //Got a new event

            if (!event.id) return;

            if (event.id in events) return
            events[event.id] = event
            eventsUpdated();

        }
    });

    return () => {
        sub.unsub();

    };
}

const getSignedEvents = async (event: any) => {
    const res = await fetch(CONSTS.apiEndpoint + '/sign-event', {
        credentials: 'include'
    })
    const data = await res.json()
    return data.event;
}

export async function post(data: string, filter: any) {


    let event: NostrEvent = {
        created_at: Math.round(Date.now() / 1000),
        kind: 1,
        tags: filter,
        content: data
    };

    event = await getSignedEvents(event);
    const publishTimeout = setTimeout(() => {
        alert(
            `failed to publish event ${event.id?.slice(0, 5)}… to any relay.`
        )
    }, 4000)

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
    event.tags.forEach(([identifier, value]) => {
        if (identifier === '#e') {
            const [eventId, _, marker] = value.split(' ');
            if (marker === 'reply') return eventId;
        }
    })
    return null;
}

export async function eventsUpdated() {
    // This function is responsible for transforming the object shaped events into a tree of comments
    // ----------------------------------------------------------------------------------------------

    // Sort them chronologically from oldest to newest
    let sortedEvenets = Object.values(events).sort((a, b) => a.created_at - b.created_at);

    type Author = {
        id: number;
        name: string;
        avatar: string;
    }

    type Comment = {
        id: string,
        pubkey: string;
        author?: Author;
        content: any;
        created_at: number;
        replies: Comment[]
    }

    // Extract the pubkeys used
    const pubkeysSet = new Set();
    sortedEvenets.forEach(e => pubkeysSet.add(e.pubkey));


    // Make a request to api to get the pubkeys' users' data
    const pubkeyToUser = await mapPubkeysToUsers(Array.from(pubkeysSet.values())) as Record<string, Author>;

    let eventsTree: Record<string, Comment> = {}
    // If event is a reply, connect it to parent
    sortedEvenets.forEach(e => {
        const parentId = extractParentId(e);
        if (parentId) {
            eventsTree[parentId]?.replies.push({
                ...e,
                author: pubkeyToUser[e.pubkey],
                replies: [],
            });
        } else {
            eventsTree[e.id] = ({
                ...e,
                author: pubkeyToUser[e.pubkey],
                replies: [],
            });
        }
    })

    // Run the censoring service
    // (nothing for now -:-)

    // Turn the top roots replies into a sorted array
    const sortedTree = Object.values(eventsTree).sort((a, b) => a.created_at - b.created_at)
    // Publish the new tree.
    return sortedTree;

}