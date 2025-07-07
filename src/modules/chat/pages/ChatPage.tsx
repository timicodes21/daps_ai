"use client";

import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import { useChat } from "../hooks/chat.hook";

const ChatPage = () => {
  const { handleSend, input, setInput, scrollRef, messages, status } =
    useChat();

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Header */}
      <header className="p-4 border-b border-border shadow-sm text-lg font-semibold">
        Daps AI
      </header>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            // className={cn(
            //   "max-w-xl px-4 py-3 rounded-lg shadow-sm whitespace-pre-wrap",
            //   msg.role === "user"
            //     ? "ml-auto bg-primary text-primary-foreground"
            //     : "mr-auto bg-muted text-muted-foreground"
            // )}
            className={cn(
              "max-w-xl px-4 py-3 rounded-lg shadow-sm whitespace-pre-wrap prose prose-invert dark:prose-invert",
              msg.role === "user"
                ? "ml-auto bg-primary text-primary-foreground"
                : "mr-auto bg-muted text-muted-foreground"
            )}
          >
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ))}
        {status === "pending" && (
          <div className="flex items-center gap-2 mr-auto text-muted-foreground px-4 py-3 bg-muted rounded-lg max-w-fit animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Thinking...</span>
          </div>
        )}
      </div>

      {/* Input area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-4 border-t border-border bg-background"
      >
        <div className="relative w-full">
          <Textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message"
            className="resize-none pr-12 max-h-40 overflow-y-auto bg-card text-card-foreground"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute bottom-2.5 right-2 h-8 w-8 sm:h-10 sm:w-10"
          >
            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatPage;
