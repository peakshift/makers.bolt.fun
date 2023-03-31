import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button, { createButtonStyleClasses } from "src/Components/Button/Button";
import {
  Club_Invitation_Status,
  useAcceptOrRejectClubInvitationMutation,
} from "src/graphql";
import { NotificationsService } from "src/services";
import { extractErrorMessage } from "src/utils/helperFunctions";
import { useAppSelector } from "src/utils/hooks";
import { createRoute, PAGES_ROUTES } from "src/utils/routing";

import JohnsAvatar from "../assets/avatar.png";

interface Props {
  status: Club_Invitation_Status;
}

export default function InvitationStatusCard(props: Props) {
  const [status, setStatus] = useState(props.status);

  const isLoggedIn = useAppSelector((s) => !!s.user.me?.id);

  const [searchParams] = useSearchParams();
  const [acceptOrReject, { loading }] =
    useAcceptOrRejectClubInvitationMutation();

  const clickAcceptOrReject = (isAccepted: boolean) => {
    const code = searchParams.get("code");
    if (!code) return;

    let isEmailValid = false;
    let email: string | null = "";

    while (!isEmailValid) {
      email = window.prompt(
        "Please provide us with an email address that we can use to contact you. We will never share your email with anyone else. We promise!"
      );

      if (!email) return;
      isEmailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.trim());
      if (!isEmailValid) alert("Please provide a valid email address");
    }

    acceptOrReject({
      variables: {
        data: {
          isAccepted,
          code,
          email: email.trim(),
        },
      },
      onCompleted: (data) => {
        setStatus(
          data.acceptOrRejectClubInvitation.is_in_founders_club
            ? Club_Invitation_Status.Accepted
            : Club_Invitation_Status.Declined
        );
      },
      onError: (error) => {
        NotificationsService.error(
          extractErrorMessage(error) ?? "Something wrong happened...",
          { error }
        );
      },
    });
  };

  const invalidInvitationCodeContent = (
    <div className="text-center">
      <p className="text-h3 mb-24 font-bolder text-primary-500 bg-gradient-to-r from-blue-500 to-violet-400 bg-clip-text text-transparent">
        Ooops...
      </p>
      <p className="text-body4 font-light">
        The invitation code in the URL doesn't seem to be valid. Please make
        sure you used the correct link.
      </p>
    </div>
  );

  const unusedInvitationContent = (
    <>
      <img
        src={JohnsAvatar}
        alt=""
        className="absolute w-[100px] top-0 right-0 -translate-y-1/4 translate-x-1/4"
      />
      <p className="text-body2 font-bold mb-4">Claim your invitation</p>
      <p className="text-body4 font-light">
        Hey it’s Johns here! <br />
        <br /> We think you’d be a great fit for our new members only community
        wanted to see if you wanted to be a part of it before we officially
        launch.
        <br />
        <br /> Check out the rest of the page and let us know if you’d like to
        join!
      </p>
      {isLoggedIn ? (
        <>
          <Button
            color="primary"
            fullWidth
            className="mt-32"
            onClick={() => clickAcceptOrReject(true)}
            disabled={loading}
          >
            Accept Invitation
          </Button>
          <Button
            color="gray"
            fullWidth
            className="mt-16"
            onClick={() => clickAcceptOrReject(false)}
            disabled={loading}
          >
            Sorry, I’m not interested
          </Button>
        </>
      ) : (
        <>
          <p className="font-light mt-16 text-body5 text-gray-200">
            Please login first to accept or reject the invitation.
          </p>
          <Link
            to={PAGES_ROUTES.auth.login}
            className={`mt-16 ${createButtonStyleClasses({
              color: "white",
              fullWidth: true,
            })}`}
            state={{ from: window.location.pathname + window.location.search }}
          >
            Connect Account ⚡
          </Link>
        </>
      )}
    </>
  );

  const acceptedInvitationContent = (
    <div className="text-center">
      <p className="text-h3 mb-24 font-bolder text-primary-500 bg-gradient-to-r from-blue-500 to-violet-400 bg-clip-text text-transparent">
        Congratulations!
      </p>
      <p className="text-body4 font-light">
        You joined the Founders Club! <br /> Stay tuned for mission#0: <br />{" "}
        Startup Pitch Competition!
      </p>
    </div>
  );

  const declinedInvitationContent = (
    <div className="text-center">
      <p className="text-h3 mb-24 font-bolder text-primary-500 bg-gradient-to-r from-blue-500 to-violet-400 bg-clip-text text-transparent">
        We Understand.
      </p>
      <p className="text-body4 font-light">
        We respect your preferences. <br /> If you later decide you want to
        join, we will have your spot reserved for you 🥰
      </p>
    </div>
  );

  return (
    <div className="basis-[326px] mx-auto bg-gray-800 rounded p-16 text-white relative">
      {status === Club_Invitation_Status.Invalid &&
        invalidInvitationCodeContent}
      {status === Club_Invitation_Status.Unused && unusedInvitationContent}
      {status === Club_Invitation_Status.Accepted && acceptedInvitationContent}
      {status === Club_Invitation_Status.Declined && declinedInvitationContent}
    </div>
  );
}
