// await prisma.tournamentParticipant.findMany({
//     select:{
//       email: true,
//       user:{
//         select: {
//           id: true,
//           name: true
//         }
//       }
//     }
//   })

const tournamentParticipants = [
  {
    email: "mtg@gmail.com",
    user: {
      id: -1,
      name: "Mtg",
    },
  },
  // ...
];

// await prisma.user.findMany({
//     select:{
//       id: true,
//       email: true,
//       name: true
//     },
//     where:{
//       NOT: {
//         email: ""
//       }
//     }
//   })

const makersWithEmails = [
  {
    id: -1,
    email: "mtg@gmail.com",
    name: "mtg",
  },
  // ...
];

let finalList = [];

const addedMakers = new Set();

for (const maker of makersWithEmails) {
  finalList.push(maker);
  addedMakers.add(maker.id);
}

for (const maker of tournamentParticipants) {
  if (!addedMakers.has(maker.user.id)) {
    finalList.push({
      id: maker.user.id,
      email: maker.email,
      name: maker.user.name,
    });
    addedMakers.add(maker.id);
  }
}

const formatted = finalList.map((e) => ({
  email: e.email,
  name: e.name,
  attributes: JSON.stringify({
    user_id: e.id,
  }),
}));

// continue the same as the other migrate-db-participants-to-listmonk.md file
