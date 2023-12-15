"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function CheckoutButton() {
  const { data: session } = useSession();

  const createCheckoutSession = async () => {
    if (!session) {
      return;
    }
    // run stripe
  };
  return (
    <div>
      <Button
        onClick={() => createCheckoutSession()}
        variant={"secondary"}
        className="mt-6 w-full bg-purple-600 text-white hover:bg-purple-800"
      >
        Sign up
      </Button>
    </div>
  );
}
