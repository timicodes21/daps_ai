import { StorageKeys } from "@/constants/storeKeys";
import { ChatMessage } from "@/services/ChatService";

export interface ChatThread {
  id: string;
  title: string;
  messages: ChatMessage[];
}

export const useChatStorage = () => {
  const getStoredChats = (): ChatThread[] => {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(StorageKeys.CHATS);
    return raw && Array.isArray(JSON.parse(raw))
      ? (JSON.parse(raw) as ChatThread[])
      : [];
  };

  const getChatById = (chatId: string): ChatThread | undefined => {
    const threads = getStoredChats();
    return threads.find(t => t.id === chatId);
  };

  const saveChatToStorage = (
    chatId: string,
    messages: ChatMessage[],
    title = "New Chat"
  ) => {
    const threads = getStoredChats();
    const index = threads.findIndex(t => t.id === chatId);

    if (index !== -1) {
      // Update existing thread
      threads[index].messages = messages;
    } else {
      // Create new thread
      threads.unshift({
        id: chatId,
        title,
        messages
      });
    }

    localStorage.setItem(StorageKeys.CHATS, JSON.stringify(threads));
  };

  return {
    saveChatToStorage,
    getChatById,
    getStoredChats
  };
};
