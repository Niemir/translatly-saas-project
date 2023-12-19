"use client";
import useAdminId from "@/hooks/useAdminId";
import { ChatMembers, chatMembersRef } from "@/lib/converters/ChatMembers";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import LoadingSpinner from "../LoadingSpinner";
import { Badge } from "../ui/badge";
import UserAvatar from "../Header/UserButton/UserAvatar";

export default function ChatMembersBadges({ chatId }: { chatId: string }) {
  const [members, loading, error] = useCollectionData<ChatMembers>(
    chatMembersRef(chatId)
  );
  const adminId = useAdminId(chatId);

  if (loading && !members) {
    return <LoadingSpinner />;
  }
  console.log("members  ", members);
  return (
    !loading && (
      <div className="p-2 border rounded-xl m-5">
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 p-2">
          {members?.map((member) => (
            <Badge
              variant={"secondary"}
              key={member.userId}
              className="h-14 p-5 pl-2 flex gap-2"
            >
              <div className="flex items-center gap-2">
                <UserAvatar name={member.email} image={member.image} />
              </div>
              <div className="gap-2">
                <p>{member.email}</p>
                {member.userId === adminId && (
                  <p className="text-indigo-400 animate-pulse">Admin</p>
                )}
              </div>
            </Badge>
          ))}
        </div>
      </div>
    )
  );
}
