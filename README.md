# Makers.Bolt.Fun

A lightning apps directory made for and by the bitcoin community.

## Environment Setup

To run the project locally, you need to have [Node.Js](https://nodejs.org/en/download/) installed on your machine.

1- Either clone the project or download it as Zip from the github repository.
2- Inside the project folder, open the cmd and run `npm install` to install all the libraries used by the project.
3- You are ready to start !!!

# Client Application

The client app is built in React + TypeScript.
To start the client app on your machine, open the CMD in the project root directory, then you will run **one** of the commands below:

1- `npm run client:prod-server`
This will run the application and will use the real backend api to get the data.

2- `npm run client:mocks`
This will spin up a local mocks server with mock data, so you can use the app offline.

3- `npm run client:dev-server`
This will assume that you have a local api server running on port 8888, and will connect to it.

In all cases, the application will be running on http://localhost:3000

# Backend API

We are using serverless functions to serve our GraphQl endpoint to the client app.

## Running locally

First, you need to have a Postegre Database to store the data, then you need to put the connection string in an .env file in your project root directory.
The connection string will be of the format:
postgresql://username:password@server/database_name

Then you need to run the migrations against your database.
use the command:

### `npm run db:migrate-dev`

Finally, you can start the serverless functions using the command:

### `npm run server:dev`

And your functions will be served on http://localhost:8888/dev/graphql

## Database

`prisma studio`

prisma studio runs an UI for the DB

`prisma migrate dev`

Create a migration from the schema.prisma file

`prisma migrate deploy`

Apply pending migrations to the database
