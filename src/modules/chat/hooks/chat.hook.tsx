import chatService, { ChatMessage } from "@/services/ChatService";
import { useEffect, useRef, useState } from "react";

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      content: "Hi there! How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "error">("idle");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input.trim(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setStatus("pending");

    try {
      const aiReply = await chatService.sendMessage(newMessages);
      // Add an empty assistant message
      setMessages((prev) => [...prev, { role: "model", content: "" }]);

      // Simulate typing
      for (let i = 0; i < aiReply.content.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 10)); // speed here
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          const updatedLast = {
            ...last,
            content: last.content + aiReply.content[i],
          };
          return [...prev.slice(0, -1), updatedLast];
        });
      }
      setStatus("idle");
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content:
            "❌ OOps Failed to get response from Daps AI. Please try again.",
        },
      ]);
    }
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return {
    handleSend,
    messages,
    setMessages,
    input,
    setInput,
    scrollRef,
    status,
  };
};
