import { authOptions } from "@/auth/options";
import ClipPath from "@/components/LandingPages/ClipPath";
import PricingCards from "@/components/LandingPages/PricingCards/PricingCards";
import { getServerSession } from "next-auth";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="p-5">
      {" "}
      <ClipPath />
      <div className="mx-auto max-w-2xl py-10 ">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-purple-50 sm:text-6xl mb-5">
            Lets handle your Membership{" "}
            <span className="text-purple-400">
              {session?.user?.name?.split(" ")?.[0]}
            </span>
          </h1>
        </div>
      </div>
      <PricingCards redirect={false} />
    </div>
  );
}
