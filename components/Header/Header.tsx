import Logo from "./Logo";
import DarkModeToggle from "./DarkModeToggle";
import UserButton from "./UserButton/UserButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/options";
import Link from "next/link";
import { MessagesSquareIcon } from "lucide-react";
import CreatChatButton from "../CreatChatButton";
import UpgradeBanner from "./UpgradeBanner";
import LanguageSelect from "../LanguageSelect";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="z-50 bg-white dark:bg-gray-900 ">
      <nav className="flex flex-col sm:flex-row items-center p-5 pl-2  gap-4 max-w-7xl mx-auto">
        <Logo />
        <div className="flex-1 flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0">
          {/* lang select */}
          <div className="flex items-center gap-2 ">
            <LanguageSelect />

            {session ? (
              <>
                <Link href="/chat" prefetch={false}>
                  <MessagesSquareIcon className="text-black dark:text-white" />
                </Link>
                <CreatChatButton />
              </>
            ) : (
              <Link href="/pricing" className="block mr-2">
                Pricing
              </Link>
            )}
          </div>
          <div className="flex space-x-2 ">
            <DarkModeToggle />
            <UserButton session={session} />
          </div>
        </div>
      </nav>

      <UpgradeBanner />
    </header>
  );
}
