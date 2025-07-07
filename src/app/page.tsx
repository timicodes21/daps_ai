// app/page.tsx
import { ClientRoutes } from "@/constants/routes";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(ClientRoutes.CHAT);
}
