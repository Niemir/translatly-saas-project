"use client";
import React from "react";
import { Button } from "../ui/button";
import { MessageSquarePlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreatChatButton() {
  const router = useRouter();
  const createNewChat = async () => {
    router.push("/chat/abc");
  };

  return (
    <Button onClick={createNewChat} variant={"ghost"}>
      <MessageSquarePlusIcon />
    </Button>
  );
}
