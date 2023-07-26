import { ChatCompletionFunctions } from "openai";
import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { Tournament, TournamentMakerDeal } from "src/graphql";
import { ChatContextProvider } from "./chat.context";
import { useTournament } from "./tournament.context";

interface TournamentChatbotContext {}

const context = createContext<TournamentChatbotContext>(null!);

export const TournamentChatbotContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { tournament, updateTournament } = useTournament();

  const tournamentRef = useRef(tournament);

  useEffect(() => {
    tournamentRef.current = tournament;
  }, [tournament]);

  const functions: Functions = useMemo(() => {
    const set_tournament_info: Functions["set_tournament_info"] = (
      new_data
    ) => {
      const newData = {
        ...tournamentRef.current,
        ...new_data,
      } as Tournament;
      tournamentRef.current = newData;
      updateTournament(new_data);
    };

    const set_tournament_deals: Functions["set_tournament_deals"] = ({
      deals,
    }) => {
      set_tournament_info({
        makers_deals: deals.map((d) => ({
          ...d,
          __typename: "TournamentMakerDeal",
        })),
      });
    };

    return {
      set_tournament_info,
      set_tournament_deals,

      get_current_tournament_state: (select) => {
        const tournament = tournamentRef.current;

        if (!tournament) throw new Error("No tournament selected");

        let result: Partial<Tournament> = {};

        for (const [key, include] of Object.entries(select)) {
          if (include)
            result[key as keyof Tournament] =
              tournament[key as keyof Tournament];
        }

        if (result.makers_deals)
          result.makers_deals = result.makers_deals?.map(
            ({ __typename, ...data }) => data
          );

        return {
          tournament_data: result,
        };
      },
    };
  }, [updateTournament]);

  return (
    <context.Provider value={{}}>
      <ChatContextProvider
        systemMessage={SYSTEM_MESSAGE}
        functionsTemplates={availableFunctions}
        functions={functions}
      >
        {children}
      </ChatContextProvider>
    </context.Provider>
  );
};

export const useTournamentChatbot = () => {
  const ctx = useContext(context);
  if (!ctx) {
    throw new Error(
      "useTournament must be used within a TournamentChatbotContextProvider"
    );
  }
  return ctx;
};

const SYSTEM_MESSAGE = `
You are an assisstant chatbot whose sole job is to help the user in updating his tournament data.

The user will provide you with a prompt that can contain one or more commands from the user.

& you will have to decide which functions to use & what parameters to pass to them to update the tournament data.

RULES:
- Never invent new functions. Only use the functions provided to you.
- Never make assumptions about the values to plug into functions. If not clear, try to check the current tournament data, then ask for clarification.
- ALWAYS get the current state of the tournament before making updates.
- If you don't know how to do something, tell the user that you can't & suggest to him contacting the admins.
- Don't answer questions or queries not related to updating the tournament data.
- Don't call the same function twice with the same parameters.
- functions that start with "set" will replace old data with new data. So make sure to include all the data you want to keep.
`;

type SelectTournamentFields = {
  [key in keyof Tournament]?: boolean;
};

type Functions = {
  set_tournament_info: (parameters: Partial<Tournament>) => void;
  set_tournament_deals: (parameters: { deals: TournamentMakerDeal[] }) => void;
  get_current_tournament_state: (parameters: SelectTournamentFields) => {
    tournament_data: Partial<Tournament>;
  };
};

const availableFunctions: ChatCompletionFunctions[] = [
  {
    name: "set_tournament_info",
    description: "set the new tournament info",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "The new title of the tournament",
        },
        description: {
          type: "string",
          description: "The new description of the tournament in markdown",
        },
        start_date: {
          type: "string",
          description: "The new start date of the tournament in ISO format",
        },
        end_date: {
          type: "string",
          description: "The new end date of the tournament in ISO format",
        },
      },
    },
  },
  {
    name: "set_tournament_deals",
    description: "set the tournament makers deals",
    parameters: {
      type: "object",
      properties: {
        deals: {
          type: "array",
          description: "the list of deals to set",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                description: "The new title of the deal",
              },
              description: {
                type: "string",
                description: "The new description of the deal in markdown",
              },
              url: {
                type: "string",
                description: "The new url of the deal",
              },
            },
          },
        },
      },
    },
  },
  {
    name: "get_current_tournament_state",
    description:
      "Get the current state of the tournament selectivly. You will only get the fields you ask for.",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "boolean",
          description: "Get title or not",
        },
        description: {
          type: "boolean",
          description: "Get description or not",
        },
        start_date: {
          type: "boolean",
          description: "Get start date or not",
        },
        end_date: {
          type: "boolean",
          description: "Get end date or not",
        },

        makers_deals: {
          type: "boolean",
          description: "Get makers deals or not",
        },
      },
    },
  },
];
