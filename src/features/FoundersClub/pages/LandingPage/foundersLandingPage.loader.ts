import { createLoader } from "src/utils/routing/helpers";
import {
  FounderClubLandingPageDocument,
  FounderClubLandingPageQuery,
  FounderClubLandingPageQueryVariables,
} from "src/graphql";

export type LoaderData = FounderClubLandingPageQuery | null;

export const foundersClubLandingPageLoader =
  createLoader<FounderClubLandingPageQueryVariables>(({ request }) => {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    return {
      query: FounderClubLandingPageDocument,
      variables: {
        invitationCode: code,
      },
    };
  });
