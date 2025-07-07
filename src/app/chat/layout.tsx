"use client";

import Sidebar from "@/shared/components/ChatLayout";

interface IProps {
  children: React.ReactNode;
}

export default function SidebarLayout({ children }: IProps) {
  return <Sidebar>{children}</Sidebar>;
}
