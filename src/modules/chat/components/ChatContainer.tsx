import { cn } from "@/lib/utils";
import { ChatRole } from "@/services/ChatService";
import React from "react";
import ReactMarkdown from "react-markdown";

interface IProps {
  role: ChatRole;
  text: string;
}

const ChatContainer = ({ role, text = "" }: IProps) => {
  return (
    <div
      className={cn(
        "max-w-xl px-4 py-3 rounded-lg shadow-sm whitespace-pre-wrap prose prose-invert dark:prose-invert",
        role === "user"
          ? "ml-auto bg-primary text-primary-foreground"
          : "mr-auto bg-muted text-muted-foreground"
      )}
    >
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
};

export default ChatContainer;
