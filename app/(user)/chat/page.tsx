import ChatList from "@/components/ChatList/ChatList";
import React from "react";

type Props = {
  params: {};
  searchParams: {
    error: string;
  };
};
export default function ChatsPage({ searchParams: { error } }: Props) {
  return (
    <div>
      <ChatList />
    </div>
  );
}
