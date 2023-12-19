"use client";
import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";
import { useSubscriptionStore } from "@/stores/subscription";
import LoadingSpinner from "@/components/LoadingSpinner";
import { SparklesIcon, StarIcon } from "lucide-react";
import ManageAccountButton from "@/components/ManageAccountButton";
import { isProUser } from "@/lib/utils";
type Props = {
  session: Session | null;
};
export default function UserButton({ session }: Props) {
  const subscription = useSubscriptionStore((state) => state.subscription);

  if (!session) {
    return (
      <Button variant={"outline"} onClick={() => signIn()}>
        Sign in
      </Button>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar name={session.user?.name} image={session.user?.image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {subscription === undefined && (
          <DropdownMenuItem className="text-center items-center justify-center">
            <LoadingSpinner />
          </DropdownMenuItem>
        )}
        {isProUser(subscription) && (
          <>
            <DropdownMenuLabel className="text-xs flex items-center justify-center space-x-1 text-[#9333ea] ">
              <SparklesIcon fill="#9333ea" />
              <p>PRO</p>
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <ManageAccountButton />
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
