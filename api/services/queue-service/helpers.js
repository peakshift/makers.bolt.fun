const { default: axios } = require("axios");
const env = require("../../utils/consts");

function callQueueApi(url, data) {
  return axios.post(env.BF_QUEUES_SERVICE_URL + url, data, {
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${env.BF_QUEUES_SERVICE_USERNAME}:${env.BF_QUEUES_SERVICE_PASS}`
      ).toString("base64")}`,
    },
  });
}

module.exports = {
  callQueueApi,
};
