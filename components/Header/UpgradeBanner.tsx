"use client";
import { useSubscriptionStore } from "@/stores/subscription";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function UpgradeBanner() {
  const sub = useSubscriptionStore((state) => state.subscription);
  const router = useRouter();
  const isPro = sub?.role === "pro";
  console.log("sub  ", sub);
  if (sub === undefined || isPro) return null;

  return (
    <Button className="w-full rounded-none bg-gradient-to-r from-purple-400 to-purple-500 text-white">
      Upgrade to Pro to unlock all features!
    </Button>
  );
}
