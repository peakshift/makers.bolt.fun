import { ChatCompletionFunctions, ChatCompletionResponseMessage } from "openai";
import { Tournament } from "src/graphql";
import { getOpenAIApi } from "./open-ai.service";

const SYSTEM_MESSAGE = `
You are an assisstant chatbot whose sole job is to help the user in updating his tournament data.

The user will provide you with a prompt that can contain one or more commands from the user.

& you will have to decide which functions to use & what parameters to pass to them to update the tournament data.

RULES:
- Only use the functions provided to you & with their parameters. Don't invent new functions.
- Don't make assumptions about what values to plug into functions if not clear. Ask for clarification.
- If you don't know how to do something, tell the user that you can't & suggest to him contacting the admins.
- Don't answer questions or queries not related to updating the tournament data.
`;

export type Functions = {
  update_tournament: (parameters: Partial<Tournament>) => void;
};

const availableFunctions: ChatCompletionFunctions[] = [
  {
    name: "update_tournament",
    description: "Update the tournament data",
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
];

export async function sendCommand(context: ChatCompletionResponseMessage[]) {
  const openai = getOpenAIApi();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: SYSTEM_MESSAGE,
      },
      ...context.map((m) => ({
        role: m.role,
        content: m.content,
        function_call: m.function_call,
      })),
    ],
    functions: availableFunctions,
  });

  const finish_reason = response.data.choices[0].finish_reason;

  if (finish_reason !== "function_call" && finish_reason !== "stop")
    throw new Error(`Unexpected finish reason: ${finish_reason}`);

  return response.data.choices[0].message;
}
