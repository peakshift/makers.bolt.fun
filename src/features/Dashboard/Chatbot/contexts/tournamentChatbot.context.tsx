import { ChatCompletionFunctions } from "openai";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Tournament, TournamentMakerDeal } from "src/graphql";
import YAML from "yaml";
import { getEmbeddings } from "../lib";
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

  const getContextMessage = useCallback(
    async ({ input }: { input: string }) => {
      if (!tournamentRef.current) return null;

      const relatedData = await getRelatedData(input);
      const dataToInclude = {} as any;
      console.log(relatedData);
      relatedData.slice(0, 2).forEach(({ field }) => {
        if (field === "title")
          dataToInclude["Tournament Title"] = tournamentRef.current?.title;
        if (field === "description")
          dataToInclude["TournamentDescription"] =
            tournamentRef.current?.description;
        if (field === "start_date")
          dataToInclude["Start Date"] = tournamentRef.current?.start_date;
        if (field === "end_date")
          dataToInclude["End Date"] = tournamentRef.current?.end_date;
        if (field === "makers_deals")
          dataToInclude["Makers Deals"] =
            tournamentRef.current?.makers_deals.map((d) => ({
              title: d.title,
              description: d.description,
              url: d.url,
            }));
      });

      return YAML.stringify(dataToInclude);
    },
    []
  );

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

      // get_current_tournament_state: (select) => {
      //   const tournament = tournamentRef.current;

      //   if (!tournament) throw new Error("No tournament selected");

      //   let result: Partial<Tournament> = {};

      //   for (const [key, include] of Object.entries(select)) {
      //     if (include)
      //       result[key as keyof Tournament] =
      //         tournament[key as keyof Tournament];
      //   }

      //   if (result.makers_deals)
      //     result.makers_deals = result.makers_deals?.map(
      //       ({ __typename, ...data }) => data
      //     );

      //   return {
      //     tournament_data: result,
      //   };
      // },
    };
  }, [updateTournament]);

  return (
    <context.Provider value={{}}>
      <ChatContextProvider
        systemMessage={SYSTEM_MESSAGE}
        functionsTemplates={availableFunctions}
        getContextMessage={getContextMessage}
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
- Never make assumptions about the values to plug into functions. If not clear, ask user for clarification.
- Always Use the existing data in the tournament to make decisions.
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
  // get_current_tournament_state: (parameters: SelectTournamentFields) => {
  //   tournament_data: Partial<Tournament>;
  // };
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
  // {
  //   name: "get_current_tournament_state",
  //   description:
  //     "Get the current state of the tournament selectivly. You will only get the fields you ask for.",
  //   parameters: {
  //     type: "object",
  //     properties: {
  //       title: {
  //         type: "boolean",
  //         description: "Get title or not",
  //       },
  //       description: {
  //         type: "boolean",
  //         description: "Get description or not",
  //       },
  //       start_date: {
  //         type: "boolean",
  //         description: "Get start date or not",
  //       },
  //       end_date: {
  //         type: "boolean",
  //         description: "Get end date or not",
  //       },

  //       makers_deals: {
  //         type: "boolean",
  //         description: "Get makers deals or not",
  //       },
  //     },
  //   },
  // },
];

async function getRelatedData(input: string) {
  // const input1 = [
  //   "add or update title",
  //   "add or update description",
  //   "add or update start and end dates",
  //   "add or update or delete makers deals",
  //   // "add or update or delete organizers",
  //   // "add or update or delete prizes",
  //   // "add or update or delete schedule",
  // ];

  const fieldsEmbeddings = await getFieldsEmbeddings();

  const inputEmbedding = await getEmbeddings([input]).then(
    (res) => res.data[0].embedding
  );

  const similarities = getSimilarities(
    inputEmbedding,
    fieldsEmbeddings.map((f) => f.embeddings)
  );

  const fieldsSimilarities = fieldsEmbeddings.map((f, i) => ({
    field: f.field,
    similarity: similarities[i],
  }));

  const sortedFields = fieldsSimilarities.sort(
    (a, b) => b.similarity - a.similarity
  );

  return sortedFields;
}

const fields = {
  title: "add or update title",
  description: "add or update description",
  start_date: "add or update start date",
  end_date: "add or update end date",
  makers_deals: "add or update makers deals",
} as const;

let cachedFieldsEmbeddings:
  | { field: keyof typeof fields; embeddings: number[] }[]
  | null = null;

async function getFieldsEmbeddings() {
  if (cachedFieldsEmbeddings === null) {
    const embeddings = await getEmbeddings(Object.values(fields)).then((res) =>
      res.data.map((d) => d.embedding)
    );
    cachedFieldsEmbeddings = embeddings.map((embedding, i) => ({
      field: Object.keys(fields)[i] as keyof typeof fields,
      embeddings: embedding,
    }));
  }

  return cachedFieldsEmbeddings;
}

type Vector = number[];

function getSimilarities(test: Vector, options: Vector[]) {
  function dotproduct(a: Vector, b: Vector) {
    let n = 0,
      lim = Math.min(a.length, b.length);
    for (let i = 0; i < lim; i++) n += a[i] * b[i];
    return n;
  }
  function norm2(a: Vector) {
    let sumsqr = 0;
    for (let i = 0; i < a.length; i++) sumsqr += a[i] * a[i];
    return Math.sqrt(sumsqr);
  }
  function similarity(a: Vector, b: Vector) {
    return dotproduct(a, b) / norm2(a) / norm2(b);
  }

  let similarities = [];
  for (let i = 0; i < options.length; i++) {
    similarities.push(similarity(test, options[i]));
  }
  return similarities;
}

// getRelatedData(`
// Make the end date month september
// `).then((res) => console.log(res));
