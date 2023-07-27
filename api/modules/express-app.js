const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const createExpressApp = (router) => {
  const app = express();
  const routerBasePath = process.env.LOCAL ? `/dev` : `/.netlify/functions`;

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  app.use(cookieParser());
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://studio.apollographql.com",
      ],
      credentials: true,
    })
  );

  if (router) app.use(routerBasePath, router);

  return app;
};

module.exports = createExpressApp;
