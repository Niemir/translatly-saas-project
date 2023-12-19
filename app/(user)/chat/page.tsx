import ChatList from "@/components/ChatList/ChatList";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
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
      {error === "permission" && (
        <>
          <Alert variant="destructive" className="mt-5">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              You do not have permission to see that chat.
            </AlertDescription>
          </Alert>
        </>
      )}
      <ChatList />
    </div>
  );
}
