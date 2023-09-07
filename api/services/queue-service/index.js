const emailService = require("./emails-service");
const nostrService = require("./nostr-service");
const searchIndexService = require("./search-index-service");

const queueService = {
  nostrService,
  emailService,
  searchIndexService,
};

module.exports = { queueService };
