import {
  ChatCompletionFunctions,
  ChatCompletionRequestMessage,
  ChatCompletionResponseMessage,
  Configuration,
  CreateEmbeddingRequest,
  OpenAIApi,
} from "openai";
import { CONSTS } from "src/utils";

let openai: OpenAIApi;

export function getOpenAIApi() {
  if (openai) return openai;

  let apiKey: string | null = CONSTS.OPENAI_API_KEY;

  if (!apiKey) apiKey = prompt("Please enter an OpenAI API key");

  if (!apiKey) throw new Error("No OpenAI API key provided");

  const configuration = new Configuration({
    apiKey,
  });

  openai = new OpenAIApi(configuration);

  return openai;
}

export async function sendCommand({
  messages: _messages,
  systemMessage,
  availableFunctions = [],
}: {
  systemMessage?: string;
  availableFunctions?: ChatCompletionFunctions[];
  messages: ChatCompletionRequestMessage[];
}) {
  const openai = getOpenAIApi();

  let messages: ChatCompletionRequestMessage[] = [];

  if (systemMessage) {
    messages.push({
      role: "system",
      content: systemMessage,
    });

    messages.push(
      ..._messages.map((m) => ({
        role: m.role,
        name: m.name,
        content: m.content,
        function_call: m.function_call,
      }))
    );

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
      ...(availableFunctions.length > 0 && { functions: availableFunctions }),
    });

    const finish_reason = response.data.choices[0].finish_reason;

    if (finish_reason !== "function_call" && finish_reason !== "stop")
      throw new Error(`Unexpected finish reason: ${finish_reason}`);

    return response.data.choices[0].message;
  }
}

export async function getEmbeddings(input: string | string[]) {
  const openai = getOpenAIApi();

  const response = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input,
  });

  return response.data;
}
