const { PrismaClient } = require("@prisma/client");
const { generatePrivateKey, getPublicKey } = require("../../api/utils/nostr-tools");
const { categories, projects } = require("./data");


const prisma = new PrismaClient()


async function purge() {
    await prisma.award.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.vote.deleteMany();
    await prisma.project.deleteMany();
    await prisma.category.deleteMany();
}


async function generateNostrKeys() {
    const allUsers = await prisma.user.findMany({
        where: {
            nostr_prv_key: null
        }
    })
    for (const user of allUsers) {

        const prvkey = generatePrivateKey();
        const pubkey = getPublicKey(prvkey);

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                nostr_prv_key: prvkey,
                nostr_pub_key: pubkey
            }
        })
    }
}



async function main() {
    console.log("Purging old data");
    await purge()

    console.log("Creating Categories");
    await prisma.category.createMany({
        data: categories.map(item => ({
            id: item.id,
            title: item.title,
            cover_image: 'https://via.placeholder.com/1920x850.png?text=Category+Cover+Image',
            icon: '🎭'
        }))
    })


    console.log("Creating Projects");
    projects.forEach(async item => {
        const { category, ...feilds } = item
        await prisma.project.create({
            data: {
                ...feilds,
                tags: {
                    connectOrCreate: [
                        {
                            where: {
                                title: 'Tag 1'
                            },
                            create: {
                                title: "Tag 1"
                            }
                        },
                        {
                            where: {
                                title: 'Tag 2'
                            },
                            create: {
                                title: "Tag 2"
                            }
                        },
                        {
                            where: {
                                title: 'Tag 3'
                            },
                            create: {
                                title: "Tag 3"
                            }
                        },]
                },
                category_id: category.id,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
                screenshots: Array(4).fill('https://via.placeholder.com/1280x729.png?text=Project+Screenshot')
            }
        })
    })

}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })