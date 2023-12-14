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

  inviteJudgesToJudgingRound: ({
    judges,
    tournament_id,
    tournament_title,
    round_url,
  }) => {
    return callQueueApi("/add-job/emails/invite-judges-to-judging-round", {
      judges,
      tournament_id,
      tournament_title,
      round_url,
    });
  },
};

module.exports = emailService;
