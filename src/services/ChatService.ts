// lib/chatService.ts
import axios, { AxiosInstance } from "axios";

export type ChatRole = "user" | "model" | "system";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: ChatMessage;
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

class ChatService {
  private readonly api: AxiosInstance;
  // private readonly endpoint = "https://api.openai.com/v1/chat/completions";
  private readonly endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`;

  constructor() {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      throw new Error("Missing API_KEY in .env");
    }

    this.api = axios.create({
      baseURL: this.endpoint,
      headers: {
        // Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
    });
  }

  async sendMessage(messages: ChatMessage[]): Promise<ChatMessage> {
    const formatted = messages.map((m) => ({
      role: m?.role === "model" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const payload = {
      contents: formatted,
    };

    const res = await this.api.post("", payload);

    const reply = res?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return {
      role: "model",
      content: reply ?? "🤖 Sorry, no response.",
    };
  }
}

const chatService = new ChatService();
export default chatService;
