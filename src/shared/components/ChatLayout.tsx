"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ClientRoutes } from "@/constants/routes";
import { usePathname } from "next/navigation";
import EmptyMessage from "@/modules/chat/components/EmptyMessage";
import { useChatLayout } from "../hooks/chatLayout.hook";

interface IProps {
  children: React.ReactNode;
}

const ChatLayout = ({ children }: IProps) => {
  const [open, setOpen] = useState(false);
  const { history } = useChatLayout();
  const pathname = usePathname();
  const currentChatId = pathname?.split("/").pop();

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-border p-4 hidden md:flex flex-col">
        <div className="font-semibold text-lg mb-4">History</div>
        {pathname !== "/chat" && (
          <Link href={ClientRoutes.CHAT}>
            <Button className={cn("w-full justify-start mb-4")}>
              Start New Chat
            </Button>
          </Link>
        )}
        <ScrollArea className="flex-1 pr-2 space-y-2">
          {history.length === 0 && <EmptyMessage />}
          {history.map((chat, index) => {
            const isActive = currentChatId === chat.id;
            return (
              <Link key={chat.id} href={`${ClientRoutes.CHAT}/${chat.id}`}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn("w-full justify-start")}
                >
                  {chat.title ?? `Chat ${index + 1}`}
                </Button>
              </Link>
            );
          })}
        </ScrollArea>

        {/* Settings button at the bottom */}
        <div className="mt-4 pt-4 border-t border-border">
          <Link href={ClientRoutes.SETTINGS}>
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

        <SheetTitle />

        <SheetContent side="left" className="w-64 p-4">
          <div className="font-semibold text-lg mb-4">History</div>
          {pathname !== "/chat" && (
            <Link href={ClientRoutes.CHAT}>
              <Button
                className={cn("w-full justify-start mb-4")}
                onClick={() => setOpen(false)}
              >
                Start New Chat
              </Button>
            </Link>
          )}
          <ScrollArea className="h-full pr-2 space-y-2">
            {history.length === 0 && <EmptyMessage />}
            {history.map((chat, index) => {
              const isActive = currentChatId === chat.id;
              return (
                <Link
                  key={chat.id}
                  href={`${ClientRoutes.CHAT}/${chat.id}`}
                  onClick={() => setOpen(false)}
                >
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    {chat.title ?? `Chat ${index + 1}`}
                  </Button>
                </Link>
              );
            })}
          </ScrollArea>

          {/* Settings button */}
          <div className="mt-4 pt-4 border-t border-border">
            <Link href={ClientRoutes.SETTINGS} onClick={() => setOpen(false)}>
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
      <main className="flex-1 flex flex-col overflow-hidden w-full h-screen">
        {children}
      </main>
    </div>
  );
};

export default ChatLayout;
