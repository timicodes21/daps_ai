"use client";

import { useState } from "react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const chats = [
  { id: 1, title: "Chat with GPT" },
  { id: 2, title: "Project Ideas" },
  { id: 3, title: "Marketing Copy" },
];

interface IProps {
  children: React.ReactNode;
}

export default function ChatLayout({ children }: IProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-border p-4 hidden md:flex flex-col">
        <div className="font-semibold text-lg mb-4">History</div>
        <ScrollArea className="flex-1 pr-2 space-y-2">
          {chats.map((chat) => (
            <Link key={chat.id} href={`/chat/${chat.id}`}>
              <Button variant="ghost" className={cn("w-full justify-start")}>
                {chat.title}
              </Button>
            </Link>
          ))}
        </ScrollArea>

        {/* Settings button at the bottom */}
        <div className="mt-4 pt-4 border-t border-border">
          <Link href="/chat/settings">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground"
            >
              ⚙️ Settings
            </Button>
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="absolute top-4 right-4 md:hidden z-50">
          <Button size="icon" variant="ghost">
            <Menu className="w-10 h-10" strokeWidth={2.5} size={50} />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-64 p-4">
          <div className="font-semibold text-lg mb-4">History</div>
          <ScrollArea className="h-full pr-2 space-y-2">
            {chats.map((chat) => (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                onClick={() => setOpen(false)}
              >
                <Button variant="ghost" className="w-full justify-start">
                  {chat.title}
                </Button>
              </Link>
            ))}
          </ScrollArea>

          {/* Settings button */}
          <div className="mt-4 pt-4 border-t border-border">
            <Link href="/chat/settings" onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground"
              >
                ⚙️ Settings
              </Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Chat Content */}
      <main className="flex-1 flex flex-col overflow-hidden w-full">
        {children}
      </main>
    </div>
  );
}
