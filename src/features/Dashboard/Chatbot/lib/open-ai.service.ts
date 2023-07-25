import { Configuration, OpenAIApi } from "openai";
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
