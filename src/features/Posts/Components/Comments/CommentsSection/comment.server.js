import { signEvent } from "nostr-tools";


const prvkey = '3e345e14bbf758be3ccdca67cab6c808d0a7f001433cf2492b3c2c93327ebde8';
const pubkey = 'f183af77e76bd62f0af8820ffa6d708d6826cf4a2adaa6be2d49061c94e22c0b';


export async function signEventByServer(_event) {
    // Extract user Id from cookie
    // Get his prvkey & pubkey from database
    // Generate a new prvkey if not exist & store it in the DB

    const event = {
        ..._event,
        pubkey,
        tags: _event.tags ?? []
    };

    if (!event.sig)
        event.sig = await signEvent(event, prvkey)

    return event;
}

export async function mapPubkeysToUsers(pubkeys) {
    const users = await Promise.all(pubkeys.map(pubkey =>
    // prisma.user.findUnique({ where: { nostrPubkey: pubkey } })
    ({
        id: 1,
        name: "Mtg",
        avatar: 'https://i.pravatar.cc/150?img=1',
        pubkey,
    })
    ))


    return users.reduce((acc, user) => ({ ...acc, [user.pubkey]: { ...user } }), {})
}