
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