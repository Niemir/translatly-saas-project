"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import useAdminId from "@/hooks/useAdminId";
import { addChatRef, chatMembersRef } from "@/lib/converters/ChatMembers";
import { getUserByEmailRef } from "@/lib/converters/User";
import { isProUser } from "@/lib/utils";
import { useSubscriptionStore } from "@/stores/subscription";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { PlusCircleIcon, SendIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import ShareLink from "./ShareLink";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export default function InviteUser({ chatId }: { chatId: string }) {
  const [open, setOpen] = useState(false);
  const [openInviteLink, setOpenInviteLink] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();
  const adminId = useAdminId(chatId);
  const subscription = useSubscriptionStore((state) => state.subscription);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session?.user.id) return;
    toast({
      title: "Seding invite",
      description: "Please wait while we send the invite...",
    });

    const countOfUserInChat = (await getDocs(chatMembersRef(chatId))).docs.map(
      (doc) => doc.id
    ).length;

    const isPro = isProUser(subscription);

    if (!isPro && countOfUserInChat >= 2) {
      toast({
        title: "Free plan limit exceeded",
        description:
          "You've exceeded the user limit in a single chat for a FREE plan. Upgrade to PRO.",
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

    const querySnapshot = await getDocs(getUserByEmailRef(values.email));
    if (querySnapshot.empty) {
      toast({
        title: "User not found",
        description:
          "Please enter an email address of a registred user OR sand an invitation once they signed up!",
        variant: "destructive",
      });
      return;
    }
    const userToAdd = querySnapshot.docs[0].data();

    try {
      await setDoc(addChatRef(chatId, userToAdd.id), {
        userId: userToAdd.id!,
        email: userToAdd.email!,
        timestamp: serverTimestamp(),
        isAdmin: false,
        chatId: chatId,
        image: userToAdd.image || "",
      });
      setOpen(false);
      toast({
        title: "User added to chat",
        className: "bg-green-600 text-white",
        duration: 3000,
      });
      setOpenInviteLink(true);
    } catch (error) {
      console.error(error);
    }

    form.reset();
  }

  return (
    adminId === session?.user.id && (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircleIcon className="mr-1" />
              Add User To Chat
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add User to Chat</DialogTitle>
              <DialogDescription>
                Simply enter another user&apos;s email address to invite them to
                this chat!
                <span className="text-indigo-600 font-bold">
                  {" "}
                  (Note: they must be registred)
                </span>
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-2"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="john@doe.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="ml-auto sm:w-fit w-full"
                  disabled={!form.formState.isValid}
                >
                  Add to Chat
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        <ShareLink
          chatId={chatId}
          isOpen={openInviteLink}
          setIsOpen={setOpenInviteLink}
        />
      </>
    )
  );
}
