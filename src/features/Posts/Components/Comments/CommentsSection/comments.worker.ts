import dayjs from 'dayjs'

import { generatePrivateKey, getPublicKey, relayPool } from 'nostr-tools'
import { Nullable } from 'remirror';
import { CONSTS } from 'src/utils';
import { Comment } from '../types';
import { mapPubkeysToUsers, } from './comment.server';


type Author = {
    id: number;
    name: string;
    avatar: string;
}





const pool = relayPool();
const globalKeys = {
    prvkey: '',
    pubkey: ''
}

export function now(prefix: string) {
    const hell = window.localStorage.getItem('test');
    if (!hell) window.localStorage.setItem('test', 'test');
    return hell + prefix + dayjs()
};

export function connect() {
    const RELAYS = [
        'wss://nostr.drss.io',
        'wss://nostr-relay.freeberty.net',
        'wss://nostr.unknown.place',
        'wss://nostr-relay.untethr.me',
        'wss://relay.damus.io'
    ];
    RELAYS.forEach(url => {
        pool.addRelay(url, { read: true, write: true })
    })
    pool.onNotice((notice: string, relay: any) => {
        console.log(`${relay.url} says: ${notice}`)
    })
};

const events: Record<string, Required<NostrEvent>> = {};

export function sub(filter: string, cb: (data: Comment[]) => void) {

    let sub = pool.sub({
        filter: {
            "#r": [filter]
        },
        cb: async (event: Required<NostrEvent>) => {
            //Got a new event
            console.log(event);

            if (!event.id) return;

            if (event.id in events) return
            events[event.id] = event
            const newComments = await constructTree();
            cb(newComments)

        }
    });

    return () => {
        sub.unsub();

    };
}

const getSignedEvents = async (event: any) => {
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

function setKeys() {
    if (globalKeys.prvkey) return;

    let privateKey = localStorage.getItem('nostrkey')
    if (!privateKey) {
        privateKey = generatePrivateKey()
        localStorage.setItem('nostrkey', privateKey)
    }
    pool.setPrivateKey(privateKey)
    const pubkey = getPublicKey(privateKey)
    globalKeys.prvkey = privateKey
    globalKeys.pubkey = pubkey;

}

export async function post(data: string, filter: string) {

    // setKeys();
    let event: NostrEvent;
    try {
        event = await getSignedEvents({
            // pubkey: globalKeys.pubkey,
            // created_at: Math.round(Date.now() / 1000),
            kind: 1,
            tags: [['r', filter]],
            content: data
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
    event.tags.forEach(([identifier, value]) => {
        if (identifier === '#e') {
            const [eventId, _, marker] = value.split(' ');
            if (marker === 'reply') return eventId;
        }
    })
    return null;
}

export async function constructTree() {
    // This function is responsible for transforming the object shaped events into a tree of comments
    // ----------------------------------------------------------------------------------------------

    // Sort them chronologically from oldest to newest
    let sortedEvenets = Object.values(events).sort((a, b) => a.created_at - b.created_at);



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
                id: e.id,
                body: e.content,
                created_at: e.created_at,
                pubkey: e.pubkey,
                author: pubkeyToUser[e.pubkey],
                replies: [],
            });
        } else {
            eventsTree[e.id] = ({
                id: e.id,
                body: e.content,
                created_at: e.created_at,
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