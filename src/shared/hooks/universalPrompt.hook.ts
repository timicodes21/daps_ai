import { StorageKeys } from "@/constants/storeKeys";
import { useEffect, useState } from "react";

export const useUniversalPrompt = () => {
  const [prompt, setPrompt] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(StorageKeys.UNIVERSAL_PROMPT);
    if (typeof stored === "string" && stored.trim().length > 0)
      setPrompt(stored);
  }, []);

  const updatePrompt = (value: string) => {
    setPrompt(value);
    localStorage.setItem(StorageKeys.UNIVERSAL_PROMPT, value);
  };

  const clearPrompt = () => {
    localStorage.removeItem(StorageKeys.UNIVERSAL_PROMPT);
    setPrompt(null);
  };

  return {
    prompt,
    updatePrompt,
    clearPrompt
  };
};
