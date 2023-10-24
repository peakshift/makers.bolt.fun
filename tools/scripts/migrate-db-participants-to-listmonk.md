1- Get all the participants in the DB

```js
await prisma.tournamentParticipant.findMany({
  where: {
    tournament_id: ID,
  },
  include: {
    user: {
      select: {
        name: true,
        email: true,
        location: true,
      },
    },
  },
});
```

2- get a json array that can be imported into list monk using this code:

```js
const formatted = d.map((e) => ({
  email: e.email,
  name: e.user.name,
  attributes: JSON.stringify({
    user_id: e.user_id,
  }),
}));
```

3- convert this json data to csv on:
https://konklone.io/json/

4- Import the file on listmonk
