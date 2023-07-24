import React, { useCallback, useEffect, useState } from "react";
import { Message, useChat } from "../contexts/chat.context";
import { useSubmitMessage } from "./useSubmitMessage";

interface Props {}

export default function MessagesContainer({}: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null!);

  const [msgInput, setMessageInput] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false);
  const inputWasDisabled = React.useRef(false);

  const messagesContainerRef = React.useRef<HTMLDivElement>(null!);

  const { messages: newMessages } = useChat();

  const submitMessageMutation = useSubmitMessage();

  const [messages, setMessages] = useState<Message[]>(newMessages);
  const [shouldScroll, setShouldScroll] = useState(true);

  if (messages !== newMessages) {
    const scrolledToBottom =
      messagesContainerRef.current.scrollTop +
        messagesContainerRef.current.clientHeight ===
      messagesContainerRef.current.scrollHeight;
    setShouldScroll(shouldScroll || scrolledToBottom);
    setMessages(newMessages);
  }

  const scrollToBottom = useCallback(() => {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }, []);

  useEffect(() => {
    if (shouldScroll) {
      scrollToBottom();
      setShouldScroll(false);
    }
  }, [scrollToBottom, shouldScroll]);

  useEffect(() => {
    if (!inputDisabled && inputWasDisabled.current) {
      inputRef.current.focus();
      inputWasDisabled.current = false;
    }
  }, [inputDisabled]);

  const onSubmitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (msgInput.trim() === "") return;

    try {
      setInputDisabled(true);
      await submitMessageMutation.submit(msgInput);

      setMessageInput("");
      setShouldScroll(true);
    } catch (error) {
      alert("Failed to submit message");
    } finally {
      inputWasDisabled.current = true;
      setInputDisabled(false);
    }
  };

  return (
    <>
      <div
        className="grow flex flex-col overflow-y-auto pr-8 "
        ref={messagesContainerRef}
      >
        <div className="flex flex-col grow gap-8 py-16">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col max-w-[min(90%,700px)] gap-4 rounded-24 px-16 py-8 text-white whitespace-pre-line ${
                message.role === "user"
                  ? "self-start bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 "
                  : "self-end bg-blue-600"
              }`}
            >
              <p className="text-body3">{message.content}</p>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={onSubmitMessage} className="">
        <div
          className={`flex flex-wrap gap-16 bg-gray-200 p-8 rounded-8 [&:has(input:focus)]:outline outline-gray-700 outline-2 ${
            inputDisabled && "opacity-70"
          }`}
        >
          <input
            ref={inputRef}
            className="grow p-16 bg-transparent focus:outline-none "
            placeholder={
              messages.length === 0
                ? "What's on your mind?..."
                : "Type your message here..."
            }
            value={msgInput}
            onChange={(e) => setMessageInput(e.target.value)}
            disabled={inputDisabled}
          />
          <button
            disabled={inputDisabled}
            className="max-md:grow bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 text-body3 px-32 py-8 shrink-0 rounded-8 font-bold  active:scale-90 active:disabled:scale-100 text-white"
          >
            {submitMessageMutation.currentState === "fetching-invoice"
              ? "Fetching invoice..."
              : submitMessageMutation.currentState === "getting-response"
              ? "Generating response..."
              : "Send Message"}
          </button>
        </div>
      </form>
    </>
  );
}
