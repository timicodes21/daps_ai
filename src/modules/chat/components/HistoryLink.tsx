import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "lucide-react";
import React from "react";

interface IProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

const HistoryLink: React.FC<IProps> = ({ href, isActive, children }) => {
  return (
    <Link href={href}>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn("w-full justify-start")}
      >
        {children}
      </Button>
    </Link>
  );
};

export default HistoryLink;
