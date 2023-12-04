const emailService = require("./emails-service");
const nostrService = require("./nostr-service");
const searchIndexService = require("./search-index-service");
const aiService = require("./ai-service");

const queueService = {
  nostrService,
  emailService,
  searchIndexService,
  aiService,
};

module.exports = { queueService };
