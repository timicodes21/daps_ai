import { ClientRoutes } from "@/constants/routes";
import chatService, { ChatMessage } from "@/services/ChatService";
import { useChatLayout } from "@/shared/hooks/chatLayout.hook";
import { useChatStorage } from "@/shared/hooks/chatStorage.hook";
import { useUniversalPrompt } from "@/shared/hooks/universalPrompt.hook";
import { sliceText } from "@/shared/utils/helpers";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const initMessages: ChatMessage[] = [
  {
    role: "model",
    content: "Hi there! How can I help you today?"
  }
];

export const useChat = (chatIdFromParams: string | undefined) => {
  const { loadHistory } = useChatLayout();
  const { getChatById, saveChatToStorage } = useChatStorage();
  const { prompt } = useUniversalPrompt();
  const pathName = usePathname();

  const [messages, setMessages] = useState<ChatMessage[]>(initMessages);

  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "error">("idle");
  const [chatId, setChatId] = useState<string | null>(chatIdFromParams ?? null);

  useEffect(() => {
    // Set chat if if no chat id
    if (!chatIdFromParams) {
      setChatId(uuidv4());
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input.trim()
    };

    // Inject universal prompt as a "system" message at the top
    const systemMessage: ChatMessage | null = prompt
      ? {
          role: "system",
          content: prompt
        }
      : null;

    const newMessages = systemMessage
      ? [...messages, systemMessage, userMessage]
      : [...messages, userMessage];

    setMessages([...messages, userMessage]);
    setInput("");
    setStatus("pending");

    try {
      const aiReply = await chatService.sendMessage(newMessages);
      // Add an empty assistant message
      setMessages(prev => {
        if (chatId) {
          saveChatToStorage(
            chatId,
            [...prev, { role: "model", content: aiReply?.content ?? "" }],
            sliceText(20, input)
          );
        }
        return [...prev, { role: "model", content: "" }];
      });
      loadHistory(); // Refresh history after sending message

      // Simulate typing
      for (let i = 0; i < aiReply.content.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise(resolve => {
          setTimeout(resolve, 10);
        });
        setMessages(prev => {
          const last = prev[prev.length - 1];
          const updatedLast = {
            ...last,
            content: last.content + aiReply.content[i]
          };
          return [...prev.slice(0, -1), updatedLast];
        });
      }
      setStatus("idle");
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
      setMessages(prev => [
        ...prev,
        {
          role: "model",
          content:
            "❌ OOps Failed to get response from Daps AI. Please try again."
        }
      ]);
    }
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages]);

  const runCheck = () => {
    const thread = getChatById(chatId ?? "");
    if (thread) {
      setMessages(thread.messages);
      return;
    }
    // Redirect to chat page if id does not exist
    if (pathName !== (ClientRoutes.CHAT as string)) {
      redirect(ClientRoutes.CHAT);
    }
    setMessages(initMessages);
  };

  // Load existing thread or create new
  useEffect(() => {
    runCheck();
  }, []);

  return {
    handleSend,
    messages,
    setMessages,
    input,
    setInput,
    scrollRef,
    status
  };
};
