import Logo from "./Logo";
import DarkModeToggle from "./DarkModeToggle";
import UserButton from "./UserButton/UserButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/options";
import Link from "next/link";
import { MessageSquareIcon } from "lucide-react";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <nav className="flex flex-col sm:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
        <Logo />
        <div className="flex-1 flex items-center justify-end space-x-4 ">
          {/* lang select */}

          {session ? (
            <>
              <Link href="/chat" prefetch={false}>
                <MessageSquareIcon className="text-black dark:text-white" />
              </Link>
            </>
          ) : (
            <Link href="/pricing">Pricing</Link>
          )}

          <DarkModeToggle />
          <UserButton />
        </div>
      </nav>
    </header>
  );
}
