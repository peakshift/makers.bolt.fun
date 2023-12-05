const scalars = require("./_scalars");
const misc = require("./misc");
const badges = require("./badges");
const category = require("./category");
const project = require("./project");
const vote = require("./vote");
const post = require("./post");
const users = require("./users");
const hackathon = require("./hackathon");
const judgingRounds = require("./judging-rounds");
const tournament = require("./tournament");
const donation = require("./donation");
const tag = require("./tag");

module.exports = {
  ...misc,
  ...badges,
  ...tag,
  ...scalars,
  ...category,
  ...project,
  ...vote,
  ...post,
  ...users,
  ...hackathon,
  ...judgingRounds,
  ...tournament,
  ...donation,
};
