import { MessageCircle } from "lucide-react";
import React from "react";

interface IProps {
  text?: string;
  secondaryText?: string;
  icon?: React.ReactNode;
}

const EmptyMessage: React.FC<IProps> = ({ text, icon, secondaryText }) => {
  return (
    <div className="text-sm text-muted-foreground flex flex-col items-center justify-center mt-8 px-4 text-center">
      {icon ?? <MessageCircle className="w-10 h-10 mb-2" />}
      <p>{text ?? "No chat history yet"}</p>
      <p className="text-xs mt-1">
        {secondaryText ?? "Start a new conversation to see it here."}
      </p>
    </div>
  );
};

export default EmptyMessage;
