import { StorageKeys } from "@/constants/storeKeys";
import { useEffect, useState } from "react";

export const useUniversalPrompt = () => {
  const [prompt, setPrompt] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem(StorageKeys.UNIVERSAL_PROMPT);
    if (stored) setPrompt(stored);
  }, []);

  const updatePrompt = (value: string) => {
    setPrompt(value);
    localStorage.setItem(StorageKeys.UNIVERSAL_PROMPT, value);
  };

  return {
    prompt,
    updatePrompt,
  };
};
