import { authOptions } from "@/auth/options";
import ChatInput from "@/components/Chat/ChatInput";
import { getServerSession } from "next-auth";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};
export default async function ChatPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  return (
    <div>
      <ChatInput chatId={params.chatId} />
    </div>
  );
}
