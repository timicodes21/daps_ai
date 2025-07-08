"use client";

import { useParams, useRouter } from "next/navigation";
import { useUniversalPrompt } from "@/shared/hooks/universalPrompt.hook";
import { ClientRoutes } from "@/constants/routes";
import UniversalPromptContainer from "../components/UniversalPromptContainer";
import Loader from "../components/Loader";
import ChatContainer from "../components/ChatContainer";
import ChatInputContainer from "../components/ChatInputContainer";
import { useChat } from "../hooks/chat.hook";

const ChatPage = () => {
  const params = useParams();
  const chatIdFromParams = params?.id as string | undefined;
  const { prompt: universalPrompt, clearPrompt } = useUniversalPrompt();
  const router = useRouter();

  const { handleSend, input, setInput, scrollRef, messages, status } =
    useChat(chatIdFromParams);

  return (
    <div className="flex flex-col h-[100vh] md:h-screen bg-background text-foreground">
      {/* Header */}

      <header className="p-4 border-b border-border shadow-sm text-lg font-semibold">
        DapsAI
      </header>

      {/* Prompt hint */}
      {universalPrompt && (
        <UniversalPromptContainer
          universalPrompt={universalPrompt}
          onClick={() => router.push(ClientRoutes.SETTINGS)}
          onClearPrompt={clearPrompt}
        />
      )}

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.map((msg, index) => (
          <ChatContainer
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            role={msg?.role}
            text={msg?.content ?? ""}
          />
        ))}
        {status === "pending" && <Loader />}
      </div>

      {/* Input area */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
        className="sticky bottom-0 p-4 border-t border-border bg-background"
      >
        <ChatInputContainer
          input={input}
          setInput={setInput}
          disabled={status === "pending" || input.trim().length < 3}
        />
      </form>
    </div>
  );
};

export default ChatPage;
