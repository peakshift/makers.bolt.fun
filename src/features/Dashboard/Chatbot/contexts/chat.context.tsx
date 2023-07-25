import {
  ChatCompletionRequestMessageFunctionCall,
  ChatCompletionResponseMessage,
} from "openai";
import { createContext, useState, useContext, useCallback } from "react";
import { Tournament } from "src/graphql";
import { Functions, sendCommand } from "../lib";
import { useTournament } from "./tournament.context";

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
}: {
  children: React.ReactNode;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const { tournament: currentTournament, updateTournament } = useTournament();

  const submitMessage = useCallback<ChatContext["submitMessage"]>(
    async (message: string, options) => {
      if (!currentTournament) throw new Error("No tournament selected");

      const onStatusUpdate = options?.onStatusUpdate || (() => {});

      const functions: Functions = {
        update_tournament: (tournament) => {
          updateTournament(tournament);
        },
      };

      const oldMessages = messages;

      const newResponses = [
        { content: message, role: "user" },
      ] as ChatCompletionResponseMessage[];

      onStatusUpdate("fetching-response");

      let finishedCallingFunctions = false;

      while (!finishedCallingFunctions) {
        const response = await sendCommand([...oldMessages, ...newResponses]);

        if (response?.function_call) {
          execFunction(response.function_call);
          newResponses.push(response);
        } else if (response?.content) {
          newResponses.push(response);
          finishedCallingFunctions = true;
        }
      }

      function execFunction(f: ChatCompletionRequestMessageFunctionCall) {
        const fn = functions[f.name as keyof Functions];
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
          .filter((r) => !r.function_call)
          .filter((r) => r.role === "assistant")
          .map((r) => ({
            id: Math.random().toString(),
            content: r.content ?? "",
            role: "assistant" as const,
          })),
      ]);
    },
    [currentTournament, messages, updateTournament]
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
