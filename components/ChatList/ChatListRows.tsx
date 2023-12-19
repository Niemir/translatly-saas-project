"use client";
import {
  ChatMembers,
  chatMemberCollectionGroupRef,
} from "@/lib/converters/ChatMembers";
import { MessageSquare } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import CreatChatButton from "../CreatChatButton";
import ChatListRow from "./ChatListRow";

export default function ChatListRows({
  initialChats,
}: {
  initialChats: ChatMembers[];
}) {
  const { data: session } = useSession();

  const [members, loading, error] = useCollectionData<ChatMembers>(
    session && chatMemberCollectionGroupRef(session?.user.id),
    {
      initialValue: initialChats,
    }
  );
  if (members?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center pt-40 space-y-2">
        <MessageSquare className="h-10 w-10" />
        <h1 className="text-5xl font-extralight">Welcome!</h1>
        <h2 className="pb-10">Lets get started by creating your first chat!</h2>
        <CreatChatButton isLarge />
      </div>
    );
  }
  console.log(members);
  return (
    <div className="flex flex-col gap-2 p-5">
      <h2 className="text-2xl mb-2">Choose Chat</h2>
      {members?.map((member) => (
        <ChatListRow key={member.chatId} chatId={member.chatId} />
      ))}
    </div>
  );
}
