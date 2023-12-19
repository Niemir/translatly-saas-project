"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { MessageSquarePlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import { useSubscriptionStore } from "@/stores/subscription";
import LoadingSpinner from "./LoadingSpinner";
import { v4 as uuidv4 } from "uuid";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import {
  addChatRef,
  chatMemberCollectionGroupRef,
} from "@/lib/converters/ChatMembers";
import { isProUser } from "@/lib/utils";
import { ToastAction } from "./ui/toast";

export default function CreatChatButton({ isLarge }: { isLarge?: boolean }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const subscription = useSubscriptionStore((state) => state.subscription);

  const createNewChat = async () => {
    if (!session?.user.id) return;

    setLoading(true);
    toast({
      title: "Creating chat",
      description: "We are creating your new chat...",
      duration: 4000,
    });

    const chatId = uuidv4();

    const countOfUserChats = (
      await getDocs(chatMemberCollectionGroupRef(session.user.id))
    ).docs.map((doc) => doc.id).length;
    console.log("countOfUserChats  ", countOfUserChats);
    const isPro = isProUser(subscription);

    if (!isPro && countOfUserChats >= 3) {
      toast({
        title: "Free plan limit exceeded",
        description:
          "You've exceeded the maximum count of chats in a FREE plan. Upgrade to PRO for unlimited chats.",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={() => router.push("/register")}
          >
            Upgrade to PRO
          </ToastAction>
        ),
      });
      return;
    }

    try {
      await setDoc(addChatRef(chatId, session.user.id), {
        userId: session?.user.id!,
        email: session?.user.email!,
        timestamp: serverTimestamp(),
        isAdmin: true,
        chatId: chatId,
        image: session?.user.image || "",
      });
      toast({
        title: "Success",
        description: "Your chat has been created!",
        className: "bg-green-600 text-white",
        duration: 2000,
      });
      router.push(`/chat/${chatId}`);
    } catch (error) {
      console.log("error  ", error);
      toast({
        title: "Error",
        variant: "destructive",
        description: "There was an error",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLarge) {
    return (
      <div>
        <Button onClick={createNewChat}>
          {loading ? <LoadingSpinner /> : "Create a New Chat"}
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={createNewChat} variant={"ghost"}>
      <MessageSquarePlusIcon />
    </Button>
  );
}
