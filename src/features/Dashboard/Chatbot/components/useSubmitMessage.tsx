import { useState } from "react";
import { useChat } from "../contexts/chat.context";

export const useSubmitMessage = () => {
  const { submitMessage } = useChat();
  const [currentState, setCurrentState] =
    useState<"idle" | "fetching-invoice" | "getting-response" | "error">(
      "idle"
    );
  const [error, setError] = useState<unknown>(null);

  const submit = async (prompt: string) => {
    try {
      await submitMessage(prompt, {
        onStatusUpdate: (status) => {
          if (status === "fetching-invoice")
            setCurrentState("fetching-invoice");
          if (status === "fetching-response")
            setCurrentState("getting-response");
        },
      });
      setCurrentState("idle");
    } catch (error) {
      setCurrentState("error");
      setError(error);
    } finally {
    }
  };

  return { submit, currentState, error };
};
