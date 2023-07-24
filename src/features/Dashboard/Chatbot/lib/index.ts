import {
  ChatCompletionFunctions,
  ChatCompletionResponseMessage,
  Configuration,
  OpenAIApi,
} from "openai";
import { Tournament } from "src/graphql";
import { CONSTS } from "src/utils";

const configuration = new Configuration({
  apiKey: CONSTS.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const SYSTEM_MESSAGE = `
You are an assisstant chatbot whose job is to help the user in updating his tournament data.

The user will provide you with a prompt that can contain one or more commands from the user.

& you will have to decide which functions to use & what parameters to pass to them to update the tournament data.

RULES:
- Only use the functions provided to you & with their parameters. Don't invent new functions.
- Don't make assumptions about what values to plug into functions if not clear. Ask for clarification.
`;

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

export async function sendCommand(
  prompt: string,
  context: ChatCompletionResponseMessage[],
  current_tournament_data: Partial<Tournament>
) {
  let finishedCallingFunctions = false;

  let responses: ChatCompletionResponseMessage[] = [];

  while (!finishedCallingFunctions) {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: SYSTEM_MESSAGE,
        },
        ...responses,
        {
          role: "user",
          content: prompt,
        },
        ...responses,
      ],
      functions: availableFunctions,
    });

    if (response.data.choices[0].finish_reason === "stop") {
      finishedCallingFunctions = true;

      responses.push(response.data.choices[0].message!);
    } else if (response.data.choices[0].finish_reason === "function_call") {
      responses.push(response.data.choices[0].message!);
    } else {
      throw new Error(
        `Unexpected finish reason: ${response.data.choices[0].finish_reason}`
      );
    }
  }

  console.log(responses);

  return {
    responses,
  };
}
