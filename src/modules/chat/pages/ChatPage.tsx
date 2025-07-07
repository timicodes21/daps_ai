"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hi there! How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input.trim(),
    };

    setMessages([...messages, newMessage]);
    setInput("");

    // Simulated AI reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 2,
          role: "assistant",
          content: "Got it! Let me think about that...",
        },
      ]);
    }, 800);
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Header */}
      <header className="p-4 border-b border-border shadow-sm text-lg font-semibold">
        Daps AI
      </header>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "max-w-xl px-4 py-3 rounded-lg shadow-sm whitespace-pre-wrap",
              msg.role === "user"
                ? "ml-auto bg-primary text-primary-foreground"
                : "mr-auto bg-muted text-muted-foreground"
            )}
          >
            {msg.content}
          </div>
        ))}
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
}
