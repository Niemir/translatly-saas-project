"use client";
import { Message, sortedMessagesRef } from "@/lib/converters/Messages";
import { useLanguageStore } from "@/stores/language";
import { MessageCircleIcon } from "lucide-react";
import { Session } from "next-auth";
import React, { createRef, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import LoadingSpinner from "../LoadingSpinner";
import UserAvatar from "../Header/UserButton/UserAvatar";
type Props = {
  initialMessages: Omit<Message, "timestamp">[];
  chatId: string;
  session: Session | null;
};

export default function ChatMessages({
  chatId,
  initialMessages,
  session,
}: Props) {
  const [messages, loading, error] = useCollectionData<Message>(
    session && sortedMessagesRef(chatId),
    {
      initialValue: initialMessages as Message[],
    }
  );
  const language = useLanguageStore((state) => state.language);
  const messagesEndRef = createRef<HTMLDivElement>();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messagesEndRef]);
  return (
    <div className="p-5">
      {!loading && messages?.length === 0 && (
        <div className="flex flex-col justify-center items-center p-20 rounded-xl space-y-2 bg-indigo-400 text-white font-extralight">
          <MessageCircleIcon className="h-10 w-10" />
          <h2 className="text-center">
            <span className="font-bold">Inviate a friend</span> and{" "}
            <span className="font-bold">
              Send your first message in ANY language
            </span>{" "}
            <br />
            below to get started
          </h2>
          <p>The AI will auto-detect and translate it all for you!</p>
        </div>
      )}
      {messages?.map((message) => {
        const isSender = message.user.id === session?.user.id;

        return (
          <div key={message.id} className="flex my-2 items-end">
            <div
              className={`flex flex-col relative space-y-2 p-4 w-fit line-clamp-1 mx-2 rounded-lg
              ${
                isSender
                  ? "ml-auto bg-violet-600 text-white rounded-br-none"
                  : "bg-gray-100 dark:text-gray-100 dark:bg-slate-700 rounded-bl-none"
              }`}
            >
              <p
                className={`text-xs italic font-extralight line-clamp-1 ${
                  isSender ? "text-right" : "text-left"
                }`}
              >
                {message.user.name}
              </p>
              <div className="flex space-x-2">
                <p>{message.translated?.[language] || message.input}</p>
                {!message.translated && <LoadingSpinner />}
              </div>
            </div>
            <UserAvatar
              name={message.user.name}
              image={message.user.image}
              className={`${!isSender && "-order-1"}`}
            />
          </div>
        );
      })}
      <div ref={messagesEndRef}></div>
    </div>
  );
}
