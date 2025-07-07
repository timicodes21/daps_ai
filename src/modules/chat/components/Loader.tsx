import { Loader2 } from "lucide-react";
import React from "react";

interface LoaderProps {
  text?: string;
}

const Loader = ({ text }: LoaderProps) => {
  return (
    <div className="flex items-center gap-2 mr-auto text-muted-foreground px-4 py-3 bg-muted rounded-lg max-w-fit animate-pulse">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span>{text ?? "Thinking"}...</span>
    </div>
  );
};

export default Loader;
