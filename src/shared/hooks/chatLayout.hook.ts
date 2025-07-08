import { useEffect, useState } from "react";
import { StorageKeys } from "@/constants/storeKeys";
import { ChatThread, useChatStorage } from "./chatStorage.hook";

export const useChatLayout = () => {
  const [history, setHistory] = useState<ChatThread[]>([]);
  const { getStoredChats } = useChatStorage();

  const loadHistory = () => {
    const stored = getStoredChats();
    if (stored && Array.isArray(stored)) {
      setHistory(stored);
    } else {
      setHistory([]);
    }
  };

  useEffect(() => {
    loadHistory();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === StorageKeys.CHATS) {
        loadHistory();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return {
    history,
    loadHistory
  };
};
