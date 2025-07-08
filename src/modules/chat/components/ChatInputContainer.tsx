import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import React from "react";

interface IProps {
  input: string;
  setInput: (value: string) => void;
  disabled: boolean;
}

const ChatInputContainer: React.FC<IProps> = ({
  input,
  setInput,
  disabled = false
}) => {
  return (
    <div className="relative w-full">
      <Textarea
        rows={1}
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Send a message"
        className="resize-none pr-12 max-h-40 overflow-y-auto bg-card text-card-foreground"
      />

      <Button
        type="submit"
        disabled={disabled}
        size="icon"
        className="absolute bottom-2.5 right-2 h-8 w-8 sm:h-10 sm:w-10"
      >
        <Send className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </div>
  );
};

export default ChatInputContainer;
