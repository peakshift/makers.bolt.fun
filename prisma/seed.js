const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const category = await prisma.category.create({
    data: {
      title: 'El Salvador',
    },
  });

  const project = await prisma.project.create({
    data: {
      title: "Captain Morgan",
      description: "HQ on a VULCANO lake",
      website: "https://github.com/peakshift",
      category_id: category.id,
    }
  });
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })