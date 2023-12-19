"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import useAdminId from "@/hooks/useAdminId";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteChatButton({ chatId }: { chatId: string }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();
  const adminId = useAdminId(chatId);
  const router = useRouter();

  async function deleteChat() {
    toast({
      title: "Deleting Chat",
      description: "Please wait while we delete the chat",
    });

    try {
      const isDeleted = await fetch("/api/chat/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatId }),
      });
      if (isDeleted) {
        toast({
          title: "Successfully deleted chat",
          duration: 3000,
        });
        router.replace("/chat");
      }
    } catch (error) {
      toast({
        title: "Something went wrong while deleting Chat",
        variant: "destructive",
      });
    } finally {
      setOpen(false);
    }
  }

  return (
    session?.user.id === adminId && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"destructive"}>
            <Trash className="mr-1" />
            Delete Chat
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will delete the chat for all users.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col sm:flex-row items-center gap-2 justify-end">
            <Button variant={"destructive"} onClick={deleteChat}>
              Delete
            </Button>
            <Button variant={"outline"} onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  );
}
