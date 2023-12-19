import React from "react";
import DeleteChatButton from "./DeleteChatButton";
import InviteUser from "./InviteUser";

export default function ChatAdminControls({ chatId }: { chatId: string }) {
  return (
    <div className="flex flex-col md:flex-row gap-2 w-full justify-end">
      <InviteUser chatId={chatId} />
      <DeleteChatButton chatId={chatId} />
    </div>
  );
}
