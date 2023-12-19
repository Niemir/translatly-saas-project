import { authOptions } from "@/auth/options";
import { db } from "@/firebase";
import { chatMemberCollectionGroupRef } from "@/lib/converters/ChatMembers";
import { collection, getDocs, query } from "firebase/firestore";
import { getServerSession } from "next-auth";
import React from "react";
import ChatListRows from "./ChatListRows";

export default async function ChatList() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) return null;

  const chatsSnapshot = await getDocs(
    chatMemberCollectionGroupRef(session?.user.id)
  );

  const initialChats = chatsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    timestamp: null, // to fix problem with passing plain objects to  client components
  }));

  return <ChatListRows initialChats={initialChats} />;
}
