import { Button } from "@/components/ui/button";
import React from "react";

interface IProps {
  universalPrompt: string;
  onClearPrompt: () => void;
  onClick: () => void;
}

const UniversalPromptContainer = ({
  universalPrompt,
  onClearPrompt,
  onClick
}: IProps) => {
  return (
    <div className="flex items-start justify-between px-4 py-2 text-xs border-b border-border bg-muted">
      <div
        className="text-foreground italic cursor-pointer line-clamp-2"
        onClick={onClick}
        tabIndex={0}
        role="button"
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            onClick();
          }
        }}
      >
        Universal prompt is active:{" "}
        <span className="font-medium text-muted-foreground">
          {universalPrompt}
        </span>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="text-xs h-auto px-2 py-0.5 ml-4 text-red-500 hover:text-red-600"
        onClick={onClearPrompt}
      >
        Clear
      </Button>
    </div>
  );
};

export default UniversalPromptContainer;
