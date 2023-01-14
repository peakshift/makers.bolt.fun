const { default: axios } = require("axios");
const { CONSTS } = require("../utils");

function sendNewStoryNotification({ id, title, authorName }) {
  const content = `**${authorName.slice(0, 15)}** published a new story:

_**${title}**_

https://makers.bolt.fun/story/${toSlug(title)}--${id}
  `;

  return sendNotifications({ content });
}

function sendNewCommentNotification({ storyId, storyTitle, authorName }) {
  const content = `**${authorName.slice(
    0,
    15
  )}** commented on story: **${storyTitle}**
https://makers.bolt.fun/story/${toSlug(storyTitle)}--${storyId}`;

  return sendNotifications({ content });
}

function sendNotifications({ content }) {
  return Promise.all([notifyDiscord({ content })]);
}

function notifyDiscord({ content }) {
  if (!CONSTS.DISCORD_NOTIFICATIONS_WEBHOOK_URL) return;
  return axios.post(CONSTS.DISCORD_NOTIFICATIONS_WEBHOOK_URL, { content });
}

module.exports = {
  sendNewStoryNotification,
  sendNewCommentNotification,
};

function toSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
