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

2- Extract the countries from the list when not null, & put them in a `Set`

```js
const countriesSet = new Set();
data.forEach((i) => {
  if (i.user.location) countriesSet.add(i.user.location);
});
const result = Array.from(countriesSet);
```
