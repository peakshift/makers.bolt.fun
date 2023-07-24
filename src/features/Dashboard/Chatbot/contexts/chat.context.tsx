import { createContext, useState, useContext, useCallback } from "react";
import { Tournament } from "src/graphql";
import { sendCommand } from "../lib";

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
  currentTournament,
}: {
  children: React.ReactNode;
  currentTournament?: Partial<Tournament>;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const submitMessage = useCallback<ChatContext["submitMessage"]>(
    async (message: string, options) => {
      if (!currentTournament) throw new Error("No current tournament");

      const onStatusUpdate = options?.onStatusUpdate || (() => {});

      onStatusUpdate("fetching-response");
      const chatbotResponses = await sendCommand(
        message,
        [],
        currentTournament
      );

      console.log(chatbotResponses);

      // go over the functions calls and execute them

      onStatusUpdate("response-fetched");

      setMessages((prev) => [
        ...prev,
        { id: Math.random().toString(), content: message, role: "user" },
        ...chatbotResponses.responses
          .filter((r) => !r.function_call)
          .map((r) => ({
            id: Math.random().toString(),
            content: r.content ?? "",
            role: "assistant" as const,
          })),
      ]);
    },
    [currentTournament]
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
