const { callQueueApi } = require("./helpers");

const emailService = {
  sendOTP: (email, otp) => {
    return callQueueApi("/add-job/emails/send-otp", {
      email,
      otp,
    });
  },

  newUserRegisteredInTournament: ({
    user_id,
    user_name,
    tournament_id,
    email,
  }) => {
    return callQueueApi("/add-job/emails/new-user-registered-in-tournament", {
      user_id,
      user_name,
      tournament_id,
      email,
    });
  },

  newProjectSubmittedInTournament: ({
    user_id,
    project_id,
    tournament_id,
    track_id,
  }) => {
    return callQueueApi("/add-job/emails/new-project-submitted-to-tournament", {
      user_id,
      project_id,
      tournament_id,
      track_id,
    });
  },

  subscribeToNewsletter: ({ email, user_id, user_name }) => {
    return callQueueApi("/add-job/emails/subscribe-to-newsletter", {
      email,
      user_id,
      user_name,
    });
  },
};

module.exports = emailService;
