"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useUniversalPrompt } from "@/shared/hooks/universalPrompt.hook";

const SettingsPage = () => {
  const { prompt, updatePrompt } = useUniversalPrompt();

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
            className="min-h-[120px] text-sm max-h-40"
            value={prompt ?? ""}
            onChange={e => updatePrompt(e.target.value)}
            placeholder="e.g. Act as a professional marketing assistant..."
          />
          <p className="text-sm text-muted-foreground">
            This prompt will be prepended to all your messages.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
