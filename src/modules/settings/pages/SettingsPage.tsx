"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("universalPrompt");
    if (saved) setPrompt(saved);
  }, []);

  const handleChange = (value: string) => {
    setPrompt(value);
    localStorage.setItem("universalPrompt", value);
  };

  return (
    <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>

        <div className="space-y-2">
          <Label htmlFor="prompt" className="text-base">
            Universal Prompt
          </Label>
          <Textarea
            id="prompt"
            className="min-h-[120px] text-sm"
            value={prompt}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="e.g. Act as a professional marketing assistant..."
          />
          <p className="text-sm text-muted-foreground">
            This prompt will be prepended to all your messages.
          </p>
        </div>
      </div>
    </div>
  );
}
