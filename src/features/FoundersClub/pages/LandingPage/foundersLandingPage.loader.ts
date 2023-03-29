import { createLoader } from "src/utils/routing/helpers";
import {
  IsClubInvitationValidDocument,
  IsClubInvitationValidQuery,
  IsClubInvitationValidQueryVariables,
} from "src/graphql";

export type LoaderData = IsClubInvitationValidQuery | null;

export const foundersClubLandingPageLoader =
  createLoader<IsClubInvitationValidQueryVariables>(({ request }) => {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    return {
      query: IsClubInvitationValidDocument,
      variables: {
        invitationCode: code!,
      },
      skip: !code,
    };
  });
