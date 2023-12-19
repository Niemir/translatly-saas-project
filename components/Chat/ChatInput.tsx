"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  User,
  limitedMessagesRef,
  messagesRef,
} from "@/lib/converters/Messages";
import { addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { SendIcon } from "lucide-react";
import { useSubscriptionStore } from "@/stores/subscription";
import { isProUser } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  input: z.string().min(2).max(1000),
});

export default function ChatInput({ chatId }: { chatId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const subscription = useSubscriptionStore((state) => state.subscription);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const inputCopy = values.input.trim();
    form.reset();
    if (inputCopy.length === 0) {
      return;
    }
    if (!session?.user) {
      return;
    }
    const messagesCount = (await getDocs(limitedMessagesRef(chatId))).docs.map(
      (doc) => doc.id
    ).length;
    const isPro = isProUser(subscription);

    if (!isPro && messagesCount >= 20) {
      toast({
        title: "Free plan limit exceeded",
        description:
          "You've exceeded the FREE plan limit of 20 messages per chat. Upgrade to PRO for unlimited chat messages.",
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

    const userToStore: User = {
      id: session.user.id,
      name: session.user.name!,
      email: session.user.email!,
      image: session.user.image || "",
    };

    addDoc(messagesRef(chatId), {
      input: inputCopy,
      timestamp: serverTimestamp(),
      user: userToStore,
    });
  }
  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row gap-3 p-2 rounded-t-xl max-w-4xl mx-auto bg-white border dark:bg-slate-800"
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    className="border-none bg-transparent dark:placeholder:text-white/70"
                    placeholder="Enter message in ANY language..."
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            Send <SendIcon className="ml-2" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
