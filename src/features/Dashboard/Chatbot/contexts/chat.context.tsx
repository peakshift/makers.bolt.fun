import {
  ChatCompletionFunctions,
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageFunctionCall,
  ChatCompletionResponseMessage,
} from "openai";
import { createContext, useState, useContext, useCallback } from "react";
import YAML from "yaml";
import { sendCommand } from "../lib/open-ai.service";

export type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
};

interface ChatContext {
  messages: Message[];
  submitMessage: (
    message: string,
    options?: Partial<{
      onStatusUpdate: (
        status:
          | "fetching-invoice"
          | "invoice-paid"
          | "fetching-response"
          | "response-fetched"
      ) => void;
    }>
  ) => Promise<void>;
}

const context = createContext<ChatContext>(null!);

export const ChatContextProvider = ({
  children,
  systemMessage,
  getContextMessage,
  functionsTemplates,
  functions,
}: {
  children: React.ReactNode;
  systemMessage: string;
  getContextMessage: (options: { input: string }) => Promise<string | null>;
  functionsTemplates: ChatCompletionFunctions[];
  functions: Record<string, Function>;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const submitMessage = useCallback<ChatContext["submitMessage"]>(
    async (message: string, options) => {
      const onStatusUpdate = options?.onStatusUpdate || (() => {});

      const oldMessages = messages;

      const newResponses = [
        { content: message, role: "user" },
      ] as (ChatCompletionRequestMessage & { internal?: boolean })[];

      onStatusUpdate("fetching-response");

      let finishedCallingFunctions = false;

      const contextMessage = await getContextMessage({
        input: message,
      });

      while (!finishedCallingFunctions) {
        const response = await sendCommand({
          messages: [...oldMessages, ...newResponses],
          availableFunctions: functionsTemplates,
          systemMessage:
            systemMessage +
            (contextMessage ? `\nContext: ${contextMessage}` : ""),
        });

        if (response?.function_call) {
          const fnResponse = execFunction(response.function_call);
          newResponses.push({ ...response, internal: true });

          newResponses.push({
            content: YAML.stringify(fnResponse ?? "Success"),
            role: "function",
            name: response.function_call.name,
            internal: true,
          });
        } else if (response?.content) {
          newResponses.push(response);
          finishedCallingFunctions = true;
        }
      }

      function execFunction(f: ChatCompletionRequestMessageFunctionCall) {
        const fn = functions[f.name as string];
        if (!fn) throw new Error(`Function ${f.name} not found`);
        return fn(JSON.parse(f?.arguments as any));
      }

      onStatusUpdate("response-fetched");

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          content: message,
          role: "user",
        },
        ...newResponses
          .filter((r) => !r.internal)
          .filter((r) => r.role === "assistant")
          .map((r) => ({
            id: Math.random().toString(),
            content: r.content ?? "",
            role: "assistant" as const,
          })),
      ]);
    },
    [functions, functionsTemplates, messages, systemMessage]
  );

  return (
    <context.Provider value={{ messages, submitMessage }}>
      {children}
    </context.Provider>
  );
};

export const useChat = () => {
  const ctx = useContext(context);
  if (!ctx) {
    throw new Error("useChat must be used within a ChatContextProvider");
  }
  return ctx;
};
