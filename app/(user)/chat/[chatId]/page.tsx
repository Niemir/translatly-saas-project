import { authOptions } from "@/auth/options";
import ChatAdminControls from "@/components/Chat/ChatAdminControls/ChatAdminControls";
import ChatInput from "@/components/Chat/ChatInput";
import ChatMembersBadges from "@/components/Chat/ChatMembersBadges";
import ChatMessages from "@/components/Chat/ChatMessages";
import { chatMembersRef } from "@/lib/converters/ChatMembers";
import { sortedMessagesRef } from "@/lib/converters/Messages";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};
export default async function ChatPage({ params: { chatId } }: Props) {
  const session = await getServerSession(authOptions);
  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => ({
      ...doc.data(),
      timestamp: null,
    })
  );

  const hasAccess = (await getDocs(chatMembersRef(chatId))).docs
    .map((doc) => doc.id)
    .includes(session?.user.id!);

  if (!hasAccess) {
    redirect("/chat?error=permission");
  }
  if (!session) {
    return null;
  }
  return (
    <>
      <div className="flex-1 pt-10">
        <ChatAdminControls chatId={chatId} />
        <ChatMembersBadges chatId={chatId} />
        <ChatMessages
          initialMessages={initialMessages}
          chatId={chatId}
          session={session}
        />
      </div>
      <ChatInput chatId={chatId} />
    </>
  );
}
