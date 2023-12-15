import Logo from "./Logo";
import DarkModeToggle from "./DarkModeToggle";
import UserButton from "./UserButton/UserButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/options";
import Link from "next/link";
import { MessagesSquareIcon } from "lucide-react";
import CreatChatButton from "./CreatChatButton";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-50  ">
      <nav className="flex flex-col sm:flex-row items-center gap-4 max-w-7xl mx-auto">
        <Logo />
        <div className="flex-1 flex items-center justify-end space-x-4 ">
          {/* lang select */}

          {session ? (
            <>
              <Link href="/chat" prefetch={false}>
                <MessagesSquareIcon className="text-black dark:text-white" />
              </Link>
              <CreatChatButton />
            </>
          ) : (
            <Link href="/pricing">Pricing</Link>
          )}

          <DarkModeToggle />
          <UserButton session={session} />
        </div>
      </nav>
    </header>
  );
}
