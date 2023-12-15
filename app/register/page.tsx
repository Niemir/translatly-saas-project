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
      <div className="mx-auto max-w-2xl py-10 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-2xl sm:text-center">
          <span className="text-purple-600 dark:text-purple-300 block mb-4">
            Register
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-purple-50 sm:text-4xl">
            Lets handle your Membership{" "}
            <span className="text-purple-400">
              {session?.user?.name?.split(" ")?.[0]}
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Choose the perfect plan for your needs.
          </p>
        </div>
      </div>
      <PricingCards redirect={false} />
    </div>
  );
}
